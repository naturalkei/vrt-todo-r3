import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Nook Todo List', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('should display app header', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Nook Todo List')
    await expect(page.locator('h1')).toContainText('🍃')
  })

  test('should add a new todo', async ({ page }) => {
    const input = page.locator('input[placeholder="Add a new task..."]')
    await input.click()
    await input.fill('Test Todo Item')
    
    const addButton = page.locator('button:has-text("Add Task")')
    await addButton.click()

    await expect(page.locator('text=Test Todo Item')).toBeVisible()
  })

  test('should toggle todo completion', async ({ page }) => {
    const input = page.locator('input[placeholder="Add a new task..."]')
    await input.click()
    await input.fill('Complete Me')
    await page.locator('button:has-text("Add Task")').click()

    const checkbox = page.locator('button').first()
    await checkbox.click()

    await expect(page.locator('text=Complete Me')).toHaveClass(/line-through/)
  })

  test('should delete a todo', async ({ page }) => {
    const input = page.locator('input[placeholder="Add a new task..."]')
    await input.click()
    await input.fill('Delete Me')
    await page.locator('button:has-text("Add Task")').click()

    await page.locator('text=🗑️').click()

    await expect(page.locator('text=Delete Me')).not.toBeVisible()
  })

  test('should filter by view mode', async ({ page }) => {
    await page.locator('input[placeholder="Add a new task..."]').click()
    await page.locator('input[placeholder="Add a new task..."]').fill('Active Task')
    await page.locator('button:has-text("Add Task")').click()

    await page.locator('button:has-text("Completed")').click()
    await expect(page.locator('text=No tasks found')).toBeVisible()

    await page.locator('button:has-text("All")').click()
    await expect(page.locator('text=Active Task')).toBeVisible()
  })

  test('should search todos', async ({ page }) => {
    await page.locator('input[placeholder="Add a new task..."]').click()
    await page.locator('input[placeholder="Add a new task..."]').fill('Searchable Task')
    await page.locator('button:has-text("Add Task")').click()

    const searchInput = page.locator('input[placeholder="Search tasks..."]')
    await searchInput.fill('Searchable')

    await expect(page.locator('text=Searchable Task')).toBeVisible()

    await searchInput.fill('NonExistent')
    await expect(page.locator('text=No tasks found')).toBeVisible()
  })

  test('should have no accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze()
    expect(accessibilityScanResults.violations).toEqual([])
  })

  test('should expand add todo form with options', async ({ page }) => {
    const input = page.locator('input[placeholder="Add a new task..."]')
    await input.click()

    await expect(page.locator('text=Priority')).toBeVisible()
    await expect(page.locator('text=Due Date')).toBeVisible()
    await expect(page.locator('text=Recurrence')).toBeVisible()
  })

  test('should set priority when adding todo', async ({ page }) => {
    const input = page.locator('input[placeholder="Add a new task..."]')
    await input.click()
    await input.fill('High Priority Task')

    await page.locator('button:has-text("High")').click()
    await page.locator('button:has-text("Add Task")').click()

    await expect(page.locator('text=High Priority Task')).toBeVisible()
    await expect(page.locator('text=⭐ High')).toBeVisible()
  })
})

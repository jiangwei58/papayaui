import { vi } from 'vitest'

vi.stubGlobal('window', {})

vi.stubGlobal('wx', {
  getFileSystemManager: vi.fn(),
  canIUse: vi.fn(),
})

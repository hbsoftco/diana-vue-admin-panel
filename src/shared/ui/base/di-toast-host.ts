type ToastHost = {
  element: HTMLDivElement
  users: number
}

const toastHosts = new Map<string, ToastHost>()

export function acquireToastHost(key: string, classes: string[]) {
  const existingHost = toastHosts.get(key)

  if (existingHost) {
    existingHost.users += 1
    return existingHost.element
  }

  const element = document.createElement('div')
  element.dataset.diToastHost = key
  element.className = ['toast', 'di-toast-host', 'z-50', 'pointer-events-none', ...classes].join(' ')
  document.body.append(element)
  toastHosts.set(key, { element, users: 1 })

  return element
}

export function releaseToastHost(key: string) {
  const host = toastHosts.get(key)

  if (!host)
    return

  host.users -= 1

  if (host.users > 0)
    return

  host.element.remove()
  toastHosts.delete(key)
}

export {}
declare global {
  const db: typeof import('/home/vt/personal/remix-starter/apps/web/app/.server/composables/db/index')['db']
  const env: typeof import('/home/vt/personal/remix-starter/apps/web/app/.server/composables/env')['env']
}
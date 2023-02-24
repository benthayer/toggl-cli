import togglClient from 'toggl-client'
import dayjs from 'dayjs'
import yargs from 'yargs'
import {defaultWorkspaceId,defaultProjectId} from '../utils.js'
import dotenv from 'dotenv'
dotenv.config()

const client = togglClient()

// TODO update yargs for ESM
const options = yargs
  .usage('Usage: $0 -p <project_id> -w <workspace_id> [time entry description]')
  .option('p', { alias: 'projectId', describe: 'project id', type: 'string', demandOption: false })
  .option('w', { alias: 'workspaceId', describe: 'workspace id', type: 'number', demandOption: false })
  .argv

async function main () {
//   console.debug(JSON.stringify(options))
  // TODO validate options
  const description = options._.join(' ')
  // TODO check that description was provided or provide a default
  const params = { description }
  params.workspaceId = defaultWorkspaceId
  params.projectId = defaultProjectId
  console.debug(params)
  const timeEntry = await createTimeEntry(params)
  console.info(`Started ${timeEntry.description}`)
}

async function createTimeEntry (params) {
  const client = Client()
  const timeEntry = await client.timeEntries.create(
    {
      description: params.description,
      wid: params.workspaceId,
      pid: params.projectId,
      start: dayjs().toISOString(),
      duration: -1 * dayjs().unix(),
      created_with: 'My app',
      at: dayjs().toISOString()
    }
  )
  return timeEntry
}

main()

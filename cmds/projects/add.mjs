export const command = 'project-add'
export const desc = 'Creates a new project.'
export const builder = {}

export const handler = async function (argv) {
  console.info(`${argv.$0} ${argv._.join(' ')} - this command is not yet supported.`)
}

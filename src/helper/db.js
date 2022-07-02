import mysql from 'mysql2/promise'

const proto = {
  connect: async () => {
    const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

    const connection = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_DATABASE,
      multipleStatements: true,
    })

    connection.config.queryFormat = function (query, values) {
      if (!values) return query
      return query.replace(
        /:(\w+)/g,
        function (txt, key) {
          /* eslint-disable-next-line */
          if (values.hasOwnProperty(key)) {
            return this.escape(values[key])
          }
          return txt
        }.bind(this)
      )
    }

    await connection.connect()
    delete proto.connect
    proto.query = async function () {
      const args = [...arguments]
      const statements = args.shift()
      const [rows] = await connection.query(
        Array.isArray(statements) ? statements.join(';') : statements,
        ...args
      )
      return rows
    }
    Object.setPrototypeOf(proto, connection)
  },
}

export default proto

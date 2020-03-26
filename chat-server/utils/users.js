const users = []

function userJoin({ id, username, avatar }) {
  const user = { username, id, avatar }

  users.push(user)

  return user
}

function userLeave(id) {
  const index = users.findIndex(user => user.id === id)

  if (index !== -1) {
    return users.splice(index, 1)[0]
  }
}

function getUsers() {
  return users
}

module.exports = {
  userJoin,
  userLeave,
  getUsers,
}

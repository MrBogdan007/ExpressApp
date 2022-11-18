let users = [
   {
      id:1,
      name: 'Alia',
      title: 'admin'
   },
   {
      id: 2,
      name: 'Anna',
      title: 'customer'
   },
   {
      id: 3,
      name: "David",
      title: 'customer'
   },
   {
      id: 4,
      name: "John",
      title: "admin"
   }

]
export const deleteUser = (id:number) => {
 users = users.filter(user=> user.id !== id)
 return users
}

export default users;
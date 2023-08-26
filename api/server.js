// BUILD YOUR SERVER HERE
const Users=require('./users/model')
const express=require('express')
const server=express()
server.use(express.json())

//solution 1-----------get all data----------------------
// server.get('/api/users',async(req,res)=>{
//     try{
//         const users = await Users.find()
//         res.status(200).json(users)


//     }catch(err){
//         res.status(500).json({ message:'The users information could not be retrieved'})
//     }
// })

//solution 2 
server.get('/api/users', (req, res) => {
    Users.find()
         .then(users=>{
             res.status(200).json(users)
         })
         .catch(err=>{
             res.status(500).json({
                 message: 'The users information could not be retrieved',
                 err:err.message,
                 stack:err.stack
         })
        })

   
})

//solution 1-----------get one data----------------------
// server.get('/api/users/:id', async (req, res) => {
//     try {
//         const {id}=req.params
//         const user = await Users.findById(id)
//         if(!user){
//             res.status(404).json({ message:'The user with the specified ID does not exist'})
//         }else{
//             res.status(200).json(user)
//         }

//     } catch (err) {
//         res.status(500).json({ message: 'The user information could not be retrieved' })
//     }
// })

//solution 2
server.get('/api/users/:id', (req, res) => {
    Users.findById(req.params.id)
         .then(user=>{
             if (!user) {
                 res.status(404).json({ message: 'The user with the specified ID does not exist' })
             } else {
                 res.status(200).json(user)
             }
         })
         .catch(err=>{
             res.status(500).json({
                 message: 'The user information could not be retrieved',
                 err: err.message,
                 stack: err.stack
             })
         }) 

    
})


//solution 1-----------post one data----------------------
// server.post('/api/users', async (req, res) => {
//     try {
//         const { name, bio } = req.body
//         if (!name||!bio){
//             res.status(400).json({ message:'Please provide name and bio for the user'})
//         }else{
//             const newUser = await Users.insert({ name, bio })
//             res.status(201).json(newUser)
//         }

//     } catch (err) {
//         res.status(500).json({ message: 'There was an error while saving the user to the database' })
//     }
// })

//solution 2
server.post('/api/users', (req, res) => {
    const user=req.body
    if (!user.name || !user.bio) {
        res.status(400).json({ message: 'Please provide name and bio for the user' })
    } else {

         Users.insert(user)
              .then(newUser=>{
                  res.status(201).json(newUser)
              })
              .catch(err=>{
                  res.status(500).json({ message: 'There was an error while saving the user to the database' })
              })
        
    }
    
})

server.put('/api/users/:id', async (req, res) => {
    try {
        const { name, bio } = req.body
        const { id } = req.params
        
        if (!name || !bio) {
            res.status(400).json({ message: 'Please provide name and bio for the user' })
        } else {
            const updatedUser = await Users.update(id,{ name, bio })
            if (!updatedUser){
                res.status(404).json({ message:'The user with the specified ID does not exist'})

            }else{
                res.status(200).json(updatedUser)
            }
            
        }

    } catch (err) {
        res.status(500).json({ message: 'The user information could not be modified' })
    }
})
//solution 1-----------delete one data----------------------
// server.delete('/api/users/:id', async (req, res) => {
//     try {
        
//         const { id } = req.params
//         const deletedUser = await Users.remove(id)
//         if (!deletedUser) {
//             res.status(404).json({ message: 'The user with the specified ID does not exist' })

//         } else {
//             res.status(200).json(deletedUser)
//         }

        

//     } catch (err) {
//         res.status(500).json({ message: 'The user could not be removed' })
//     }
// })
//solution 2
server.delete('/api/users/:id',  (req, res) => {
    Users.remove(req.params.id)
         .then(deletedUser=>{
            if (!deletedUser){
                res.status(404).json({ message: 'The user with the specified ID does not exist' })

            }else{
                res.status(200).json(deletedUser)
            }
         })
         .catch(err=>{
             res.status(500).json({ message: 'The user could not be removed' })
         })
    
})


module.exports = server; // EXPORT YOUR SERVER instead of {}

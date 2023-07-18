const ProductManager = require("../dao/fsManager/ProductManager");
const ChatsManager = require('../dao/mongoManager/BdChatsManager')

const Product = new ProductManager('./assets/product.json');
const Chat = new ChatsManager();

const {Server} = require('socket.io');
let io;

const connectionSocket = (httpServer)=>{
    io = new Server(httpServer);
    io.on ('connection', async (socket)=>{
        console.log("Nuevo Cliente conectado")
        const products = await Product.getProducts();
        const Chats  = await Chat.getMessage();
        socket.emit('init-products', products)
        socket.emit('init-chats' ,Chats)
    });
}

 const emitDeleteProduct = (id)=>{
     io.emit('delete-product', {id})
 }

 const emitaddRealtime = (add)=>{
     io.emit('add-product',{add} )
 }

 const emitMessage = (newMessage)=>{
    console.log(`Nuevo mensaje enviado: ${JSON.stringify(newMessage)}`)
    io.emit('add-message', newMessage )
 } 

 const emitDeleteMj = (message)=>{
    console.log(`Mensaje Eliminado: ${JSON.stringify(message)}`)
    io.emit('delete-message', message)
}


  
module.exports = {
    connectionSocket,
    emitDeleteProduct,
    emitaddRealtime,
    emitMessage,
    emitDeleteMj
};
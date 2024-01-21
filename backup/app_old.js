const express = require('express');
const { connectToDb, getDb } = require('./db')
const {ObjectId} = require('mongodb');

// ini app & middleware
const app = express();
app.use(express.json())

// db connection
connectToDb((err)=> {
	if (!err){
		app.listen(3000 ,() => {
			console.log('app listening on port 3000')
		});
		db = getDb();
	}
})
	


// routes
													
																//USUARIOS

app.get('/usuarios', (req, res) => {
	let usuarios = []
	db.collection('usuarios')
		.find()
		.sort({nombre:1})
		.forEach( user => usuarios.push(user) )
		.then( ()=> {
			res.status(200).json(usuarios)
		})
		.catch( () => {
			res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
		})

})

app.get('/usuarios/:id', (req, res) => {

	if (ObjectId.isValid(req.params.id)) {

		db.collection('usuarios')
			.findOne({_id:new ObjectId(req.params.id)})
			.then(doc => {
				res.status(200).json(doc)
			})
			.catch(err => {
				res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
			})
		}
		else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.post('/usuarios', (req, res) => {
	let usuario = req.body;
	db.collection('usuarios')
	.insertOne(usuario)
	.then( (result)=> {
        res.status(201).json(result)
    })
	.catch( err => {
        res.status(500).json( {error:'Lo sentimos, error al guardar usuario'})
    })
})

app.delete('/usuarios/:id', (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection('usuarios')
		.deleteOne({_id:new ObjectId(req.params.id)})
		.then( (result)=> {
            res.status(200).json(result)
        })
		.catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al eliminar usuario'})
        })
	}		
	else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.patch('/usuarios/:id', (req,res) => {
	const updates = req.body
	if (ObjectId.isValid(req.params.id)) {
		db.collection('usuarios')
		.updateOne({_id:new ObjectId(req.params.id)}, {$set:updates})
		.then( (result)=> {
            res.status(200).json(result)
        })
		.catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al actualizar usuario'})
        })
	}
	else {
		res.status(500).json( {error:'El id es Invalido'})
    }
})

															//LOGIN

app.post('/login', (req, res) => {
	const { username, password } = req.body;
 	 console.log(req.body)

	if (req.body.usuario&&req.body.password) {

		db.collection('usuarios')
			.findOne({ $and: [
				{ usuario: req.body.usuario },
				{ password: req.body.password }
			  ]})
			.then(doc => {
				res.status(200).json(doc)
			})
			.catch(err => {
				res.status(500).json( {error:'Usuario o contraseña incorrectos'})
			})
		}
		else {
        res.status(500).json( {error:'Usted ingreso valores erroneos'})
    }
})

//implementar logeo de GOOGLE




															//TOURS

app.get('/tours', (req, res) => {
	let tours = []
	db.collection('tours')
		.find()
		.sort({author:1})
		.forEach( tour => tours.push(tour) )
		.then( ()=> {
			res.status(200).json(tours)
		})
		.catch( () => {
			res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
		})

})

app.get('/tours/:id', (req, res) => {

	if (ObjectId.isValid(req.params.id)) {

		db.collection('tours')
			.findOne({_id:new ObjectId(req.params.id)})
			.then(doc => {
				res.status(200).json(doc)
			})
			.catch(err => {
				res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
			})
		}
		else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.post('/tours', (req, res) => {
	let tour = req.body;
	db.collection('tours')
	.insertOne(tour)
	.then( (result)=> {
        res.status(201).json(result)
    })
	.catch( err => {
        res.status(500).json( {error:'Lo sentimos, error al guardar el tour'})
    })
})

app.delete('/tours/:id', (req, res) => {
	if (ObjectId.isValid(req.params.id)) {
		db.collection('tours')
		.deleteOne({_id:new ObjectId(req.params.id)})
		.then( (result)=> {
            res.status(200).json(result)
        })
		.catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al borrar el tour'})
        })
	}		
	else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.patch('/tours/:id', (req,res) => {
	const updates = req.body
	if (ObjectId.isValid(req.params.id)) {
		db.collection('tours')
		.updateOne({_id:new ObjectId(req.params.id)}, {$set:updates})
		.then( (result)=> {
            res.status(200).json(result)
        })
		.catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al actualizar el tour'})
        })
	}
	else {
		res.status(500).json( {error:'El id es Invalido'})
    }
})


														//COMENTARIOS


app.get('/comentarios', (req, res) => {
    let comentarios = []
    db.collection('comentarios')
        .find()
        .sort({author:1})
        .forEach( comentario => comentarios.push(comentario) )
        .then( ()=> {
            res.status(200).json(comentarios)
        })
        .catch( () => {
            res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
        })

})

app.get('/comentarios/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('comentarios')
            .findOne({_id:new ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
            })
        }
        else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.post('/comentarios', (req, res) => {
    let comentario = req.body;
    db.collection('comentarios')
    .insertOne(comentario)
    .then( (result)=> {
        res.status(201).json(result)
    })
    .catch( err => {
        res.status(500).json( {error:'Lo sentimos, error al guardar el comentario'})
    })
})

app.delete('/comentarios/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('comentarios')
        .deleteOne({_id:new ObjectId(req.params.id)})
        .then( (result)=> {
            res.status(200).json(result)
        })
        .catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al borrar el comentario'})
        })
    }       
    else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.patch('/comentarios/:id', (req,res) => {
    const updates = req.body
    if (ObjectId.isValid(req.params.id)) {
        db.collection('comentarios')
        .updateOne({_id:new ObjectId(req.params.id)}, {$set:updates})
        .then( (result)=> {
            res.status(200).json(result)
        })
        .catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al actualizar el comentario'})
        })
    }
    else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})


													//CONTACTENOS

app.get('/contactenos', (req, res) => {
    let contactenos = []
    db.collection('contactenos')
        .find()
        .sort({author:1})
        .forEach( contacto => contactenos.push(contacto) )
        .then( ()=> {
            res.status(200).json(contactenos)
        })
        .catch( () => {
            res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
        })

})

app.get('/contactenos/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('contactenos')
            .findOne({_id:new ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
            })
        }
        else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.post('/contactenos', (req, res) => {
    let contacto = req.body;
    db.collection('contactenos')
    .insertOne(contacto)
    .then( (result)=> {
        res.status(201).json(result)
    })
    .catch( err => {
        res.status(500).json( {error:'Lo sentimos, error al guardar el contacto'})
    })
})

app.delete('/contactenos/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('contactenos')
        .deleteOne({_id:new ObjectId(req.params.id)})
        .then( (result)=> {
            res.status(200).json(result)
        })
        .catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al borrar el contacto'})
        })
    }       
    else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.patch('/contactenos/:id', (req,res) => {
    const updates = req.body
    if (ObjectId.isValid(req.params.id)) {
        db.collection('contactenos')
        .updateOne({_id:new ObjectId(req.params.id)}, {$set:updates})
        .then( (result)=> {
            res.status(200).json(result)
        })
        .catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al actualizar el contacto'})
        })
    }
    else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})


											//RESERVAS



app.get('/reservas', (req, res) => {
    let reservas = []
    db.collection('reservas')
        .find()
        .sort({author:1})
        .forEach( reserva => reservas.push(reserva) )
        .then( ()=> {
            res.status(200).json(reservas)
        })
        .catch( () => {
            res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
        })

})

app.get('/reservas/:id', (req, res) => {

    if (ObjectId.isValid(req.params.id)) {

        db.collection('reservas')
            .findOne({_id:new ObjectId(req.params.id)})
            .then(doc => {
                res.status(200).json(doc)
            })
            .catch(err => {
                res.status(500).json( {error:'Lo sentimos, no se pudo cargar el contenido'})
            })
        }
        else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.post('/reservas', (req, res) => {
    let reserva = req.body;
    db.collection('reservas')
    .insertOne(reserva)
    .then( (result)=> {
        res.status(201).json(result)
    })
    .catch( err => {
        res.status(500).json( {error:'Lo sentimos, error al guardar la reserva'})
    })
})

app.delete('/reservas/:id', (req, res) => {
    if (ObjectId.isValid(req.params.id)) {
        db.collection('reservas')
        .deleteOne({_id:new ObjectId(req.params.id)})
        .then( (result)=> {
            res.status(200).json(result)
        })
        .catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al borrar  la reserva'})
        })
    }       
    else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

app.patch('/reservas/:id', (req,res) => {
    const updates = req.body
    if (ObjectId.isValid(req.params.id)) {
        db.collection('reservas')
        .updateOne({_id:new ObjectId(req.params.id)}, {$set:updates})
        .then( (result)=> {
            res.status(200).json(result)
        })
        .catch( err => {
            res.status(500).json( {error:'Lo sentimos, error al actualizar la reserva'})
        })
    }
    else {
        res.status(500).json( {error:'El id es Invalido'})
    }
})

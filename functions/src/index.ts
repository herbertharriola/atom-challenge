import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json()); // Asegura que puedas recibir JSON en las solicitudes

// Obtener todas las tareas
app.get('/tasks', async (req, res) => {
  try {
    const snapshot = await db
      .collection('tasks')
      .where('deleted', '==', false)
      .orderBy('createdAt', 'asc')
      .get();

    const tasks = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt ? doc.data().createdAt.toDate() : null,
    }));

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Agregar una nueva tarea
app.post('/tasks', async (req, res) => {
  try {
    const newTask = {
      title: req.body.title,
      description: req.body.description || '',
      completed: false,
      createdAt: admin.firestore.Timestamp.now(),
      deleted: false,
    };

    const taskRef = await db.collection('tasks').add(newTask);
    res.json({ id: taskRef.id, ...newTask });
  } catch (error) {
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Actualizar una tarea
app.put(
  '/tasks/:taskId',
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { taskId } = req.params;
      const updateData = req.body;
      await db.collection("tasks").doc(taskId).update(updateData);
      res.json({ message: "Task updated", data: updateData });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Eliminar una tarea
// Eliminar lógicamente una tarea (actualiza deleted: true)
app.delete("/tasks/:taskId", async (req, res) => {
  try {
      const { taskId } = req.params;

      await db.collection("tasks").doc(taskId).update({ deleted: true });

      res.json({ message: "Task marked as deleted" });
  } catch (error) {
      res.status(500).json({ error: error instanceof Error ? error.message : "Unknown error" });
  }
});


// Buscar usuario por email
app.get(
  '/users/:email',
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const { email } = req.params;
      const snapshot = await db
        .collection('users')
        .where('email', '==', email)
        .get();
      if (snapshot.empty) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(snapshot.docs[0].data());
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Agregar un nuevo usuario
app.post(
  '/users',
  async (req: express.Request, res: express.Response): Promise<void> => {
    try {
      const newUser = req.body;
      await db.collection('users').add(newUser);
      res.json({ message: 'User added' });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      res.status(500).json({ error: errorMessage });
    }
  }
);

// Exportar la función para Firebase con un manejador correcto
exports.api = functions.https.onRequest((req, res) => app(req, res));

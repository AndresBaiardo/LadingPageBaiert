import {
    saveTask,
    getTask,
    onGetTasks,
    deleteTask
} from './firebase.js';

const tasksContainer = document.getElementById('tasks-container');
const taskform = document.getElementById('task-form');

window.addEventListener('DOMContentLoaded', async () => {
    
    onGetTasks((querySnapshot) => {
        let html = '';
    
        querySnapshot.forEach(doc => {
            const task = doc.data();
            html += `
                <div>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <button class='btn-delete' data-id="${doc.id}" >Delete</button>
    
                </div>
            `;
    
            
        });
        tasksContainer.innerHTML = html



        const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')
       

        btnsDelete.forEach(btn => {
            btn.addEventListener('click',({target: {dataset}}) => {
                deleteTask(dataset.id)
            })
        })

        

    });

    });
    


taskform.addEventListener('submit',(e) => {
    e.preventDefault()
    
    const title = taskform['task-title']
    const description = taskform['task-description']

    saveTask(title.value, description.value)

    taskform.reset()
    

   






})

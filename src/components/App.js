

import React, { useState, useEffect, Fragment } from 'react';

function Form({ createDate }) {


  const initialState = {
    pet: '',
    owner: '',
    date: '',
    hour: '',
    complains: ''
  }

  const [date, updateDate] = useState(initialState);


  const handleChange = e => {
    updateDate({
      ...date,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();



    //pasar la cita al componente principal

    createDate(date);

    //Reiniciar el state y reinicia el form

    updateDate(initialState);

  }


  return (

    <Fragment>
      <h2>Crear Cita</h2>

      <form onSubmit={handleSubmit}>
        <label>Nombre Mascota</label>
        <input
          type="text"
          name="pet"
          className="u-full-width"
          placeholder="Nombre Mascota"
          onChange={handleChange}
          value={date.pet}
        />

        <label>Nombre Dueño</label>
        <input
          type="text"
          name="owner"
          className="u-full-width"
          placeholder="Nombre Dueño de la Mascota"
          onChange={handleChange}
          value={date.owner}
        />

        <label>Fecha</label>
        <input
          type="date"
          className="u-full-width"
          name="date"
          onChange={handleChange}
          value={date.date}
        />

        <label>Hora</label>
        <input
          type="time"
          className="u-full-width"
          name="hour"
          onChange={handleChange}
          value={date.hour}
        />

        <label>Sintomas</label>
        <textarea
          className="u-full-width"
          name="complains"
          onChange={handleChange}
          value={date.complains}
        ></textarea>

        <button type="submit" className="button-primary u-full-width">Agregar</button>
      </form>
    </Fragment>
  )

}

function Date({ date, index, deleteDate }) {

  return (
    <div className="cita">
      <p>Mascota: <span>{date.pet}</span> </p>
      <p>Nombre Dueño:<span>{date.owner}</span></p>
      <p>Fecha:<span>{date.date}</span></p>
      <p>Hora:<span>{date.hour}</span></p>
      <p>Sintomas:<span>{date.complains}</span></p>
      <button onClick={() => deleteDate(index)}
        type="button" className="button eliminar u-full-width">Eliminar X</button>
    </div>
  )


}

function App() {

  //Cargar las citas del local storage como state inicial

  let initialDates = JSON.parse(localStorage.getItem('dates'));

  if (!initialDates) {
    initialDates = [];
  }

  // useState retorna 2 funciones
  // array distructuring
  // 1ro state actual, 2do actualiza el state

  const [dates, saveDate] = useState(initialDates);

  //Agregar al State nuevas citas

  const createDate = customer => {
    const newDates = [...dates, customer];
    //guarda en el state
    saveDate(newDates);
  }

  //Elimina las citas


  const deleteDate = index => {
    const newDates = [...dates];

    newDates.splice(index, 1)
    saveDate(newDates)
  }


  useEffect(
    () => {
      let initialDates = JSON.parse(localStorage.getItem('dates'));

      if (initialDates) {
        localStorage.setItem('dates', JSON.stringify(dates))
      } else {
        localStorage.setItem('dates', JSON.stringify([]));
      }

    }, [dates]
  )




  //Cargar condicionalmente un titulo

  const title = Object.keys(dates).length === 0 ? 'No Hay Citas' : 'Administrar Citas'



  return (
    <Fragment>

      <h1>Administrador de Pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Form
              createDate={createDate} />
          </div>
          <div className="one-half column">
            <h2>{title}</h2>
            {dates.map((date, index) => (
              <Date
                key={index}
                index={index}
                date={date}
                deleteDate={deleteDate}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default App;

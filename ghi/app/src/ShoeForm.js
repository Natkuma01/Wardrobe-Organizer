import React, { useEffect, useState } from 'react';

function ShoeForm() {
    const [bins, setBins] = useState([]);

    const [name, setName] = useState('');
    const[manufacture, setManufacture] = useState('');
    const [color, setColor] = useState('');
    const [picture, setPicture] = useState('');
    const [closetName, setClosetName] = useState('');


    const handleNameChange = (event) => {
        const value = event.target.value;
        setName(value);
    }
    const handleManufactureChange = (event) => {
        const value = event.target.value;
        setManufacture(value);
    }
    const handleColorChange = (event) => {
        const value = event.target.value;
        setColor(value);
    }
    const handlePictureChange = (event) => {
        const value = event.target.value;
        setPicture(value);
    }
    const handleClosetNameChange = (event) => {
        const value = event.target.value;
        setClosetName(value);
    }


    const handleSubmit = async (event) => {
        event.preventDefault();

    const data = {
        name: name,
        manufacturer: manufacture,
        color: color,
        picture: picture,
        bin: closetName
    }

    console.log(data);
    
    const locationUrl = 'http://localhost:8080/api/shoes/';
    const fetchConfig = {
        method: "post",
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            },
    };

    const response = await fetch(locationUrl, fetchConfig);
    if (response.ok) {
        const newShoe = await response.json();
        console.log(newShoe);

        setName('');
        setManufacture('');
        setColor('');
        setPicture('');
        setClosetName('');

    }

}

const fetchData = async () => {
    const url = 'http://localhost:8100/api/bins/';

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setBins(data.bins)

  }
}       
useEffect( () => {
  fetchData();
}, []);


  return (
    <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a new shoe</h1>
            <form onSubmit={handleSubmit} id="create-shoe-form">
              <div className="form-floating mb-3">
                <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control" />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleManufactureChange} value={manufacture} placeholder="Manufacture" required type="text" name="manufacture" id="manufacture" className="form-control" />
                <label htmlFor="manufacture">Manufacture</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control" />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input onChange={handlePictureChange} value={picture} placeholder="Picture" required type="file" accept="image/*" name="picture" id="picture" className="form-control" />
                <label htmlFor="picture">Picture</label>
              </div>
              <div className="form-floating mb-3">
                <select onChange={handleClosetNameChange} value={closetName} placeholder="Closet name" required name="closet_name" id="closet_name" className="form-control">
                <option value="">Choose a closet</option>
                {bins.map(bin => {
                    return (
                        <option key={bin.href} value={bin.href}>
                            {bin.closet_name}
                        </option>
                    );
                    })}
                </select>
              </div>
             
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    
  )}

  export default ShoeForm;
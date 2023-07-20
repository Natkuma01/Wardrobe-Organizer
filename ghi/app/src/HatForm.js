import React, {useEffect, useState} from "react"

function HatForm() {
    const [name, setName] = useState('')
    const [fabric, setFabric] = useState('')
    const [color, setColor] = useState('')
    const [closet, setCloset] = useState('')
    const [picture, setPic] = useState('')
    const [closets, setClosets] = useState([])


    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }
    const handleFabricChange = (event) => {
        const value = event.target.value
        setFabric(value)
    }
    const handleColorChange = (event) => {
        const value = event.target.value
        setColor(value)
    }
    const handleClosetChange = (event) => {
        const value = event.target.value
        setCloset(value)
    }
    const handlePicChange = (event) => {
        const value = event.target.value
        setPic(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const body = {
            name: name,
            fabric: fabric,
            color: color,
            location: closet,
            picture_url: picture,
        }

        const postUrl = 'http://localhost:8090/api/hats/';
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        }

        const response = await fetch(postUrl, fetchConfig);
        if (response.ok) {
            const newHat = await response.json()

            setName('')
            setFabric('')
            setColor('')
            setCloset('')
            setPic('')
        }
    }
    const fetchData = async () => {
        const url = 'http://localhost:8100/api/locations/'
        const response = await fetch(url)
        if (response.ok) {
            const data = await response.json()
            setClosets(data.locations)
        }
    }
    useEffect( () => {fetchData()}, [])

    return (
        <>
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a new Hat</h1>
                    <form onSubmit={handleSubmit} id="create-hat-form">
                        <div className="form-floating mb-3">
                            <input onChange={handleNameChange} value={name} placeholder="Name" required type="text" name="name" id="name" className="form-control"/>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleFabricChange} value={fabric} placeholder="Fabric" required type="text" name="fabric" id="fabric" className="form-control"/>
                            <label htmlFor="fabric">Fabric</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handleColorChange} value={color} placeholder="Color" required type="text" name="color" id="color" className="form-control"/>
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={handlePicChange} value={picture} placeholder="Picture" required type="text" name="color" id="picture" className="form-control"/>
                            <label htmlFor="picture">Picture</label>
                        </div>
                        <div className="mb-3">
                            <select onChange={handleClosetChange} value={closet} required name="closet" id="closet" className="form-select">
                            <option value="">Choose a Closet</option>
                            {closets && closets.map(closet => {
                                 return (
                                 <option key={closet.id} value={closet.href}>
                                    {closet.closet_name}
                                 </option>
                                 )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}
export default HatForm

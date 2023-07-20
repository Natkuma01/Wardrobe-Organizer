
function HatList({hats}) {


    const handleDelete = async (id) => {

        const delUrl = `http://localhost:8090/api/hats/${id}/`
        const fetchConfig = {
            method: 'delete'
        }

        const response = await fetch(delUrl, fetchConfig)
        if (response.ok) {
            window.location.reload()
        }

    }

    return (
    <table className="table table-striped">
        <thead>
            <tr>
                <th>Hats</th>
                <th>Fabric</th>
                <th>Color</th>
                <th>Picture</th>
                <th>Closet</th>
            </tr>
        </thead>
        <tbody>
            {hats && hats.map(hat => {
                return (
                <tr key={hat.id}>
                    <td>{ hat.name }</td>
                    <td>{ hat.fabric }</td>
                    <td>{ hat.color }</td>
                    <td>
                        <img src={hat.picture_url} alt='Picture of Hat' width='150' />
                    </td>
                    <td>
                        <button onClick={(event) => handleDelete(hat.id)} className="btn btn-primary">Delete</button>
                    </td>
                    <td>{ hat.location }</td>
                </tr>
                );
            })}
        </tbody>
    </table>
    )
}
export default HatList

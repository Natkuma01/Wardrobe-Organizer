function ShoesList ({shoes}) {
console.log(shoes)

    const handleRemove = async (id) => { 
       
       const deleteUrl =`http://localhost:8080/api/shoes/${id}/`
       const fetchConfig = {
        method: 'delete'
       } 
       const response = await fetch(deleteUrl, fetchConfig)
       if (response.ok) {
        window.location.reload()
       }
       

    };
    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Manufacture</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Closet Name</th>
            
          </tr>
        </thead>
        <tbody>
          {shoes && shoes.map(shoe => {
            return (
              <tr key={shoe.id}>
                <td>{ shoe.name }</td>
               <td>{ shoe.manufacturer }</td>
                <td>{ shoe.color }</td>
                <td><img src={ shoe.picture } /></td>
                <td>{ shoe.bin.closet_name }</td>
              <td><button type="button" onClick={() => handleRemove(shoe.id)}>Delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );


};

export default ShoesList;


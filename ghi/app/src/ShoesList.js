function ShoesList (props) {
    return (
        <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Conference</th>
            
          </tr>
        </thead>
        <tbody>
          {props.shoes.map(shoe => {
            return (
              <tr key={shoe.href}>
                <td>{ shoe.name }</td>
                <td>{ shoe.manufacturer }</td>
                <td>{ shoe.color }</td>
                <td>{ shoe.picture }</td>
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )


}

export default ShoesList;
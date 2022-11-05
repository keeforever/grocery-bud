import {FaEdit,FaTrash} from 'react-icons/fa'
  const ListItems = ({lists,onDelete,onEdit}) => {
  return (
    <section className="grocery-list-container">
      {
        lists.map(({text,id},index)=>{
          return (
            <article key={index} className='list-item'>
              <p className='list-text'>{text}</p>
              <div className="btn-container">
               <FaEdit className='btn-edit' onClick={()=>onEdit(id)}/>
               <FaTrash className='btn-delete' onClick={()=>onDelete(id)}/>
              </div>
            </article>
          )
        })
      }
    </section>
  )
}

export default ListItems

import React from 'react'


class AddFolder extends React.Component {
  static defaultProps ={
    onAddNote: () => {},
  }

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault()
    const folderId = this.props.id

    fetch(`${config.API_ENDPOINT}/folders/${folderId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    })
      .then(res => {
        if (!res.ok)
          return res.json().then(e => Promise.reject(e))
        return res.json()
      })
      .then(() => {
        this.context.addNote(folderId)
        // allow parent to perform extra behaviour
        this.props.onAddNote(folderId)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { name, id, modified } = this.props
    return (
      <div className='Note'>
        <h2 className='Note__title'>
          <Link to={`/note/${id}`}>
            {name}
          </Link>
        </h2>
        <button
          className='Note__delete'
          type='button'
          onClick={this.handleClickDelete}
        >
          <FontAwesomeIcon icon='trash-alt' />
          {' '}
          remove
        </button>
        <div className='Note__dates'>
          <div className='Note__dates-modified'>
            Modified
            {' '}
            <span className='Date'>
              {format(parseISO(modified), 'do MMM yyyy')}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default AddFolder
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

interface CardHomepageInterface {
    imageSrc: string | null;
    title: string;
    text:string;
    editPost: () => void;
    deletePost: () => void;
}

const CardHomepage: React.FC<CardHomepageInterface> = ( { imageSrc, title, text, editPost, deletePost } ) => {
  return (
    <Card style={{ width: '18rem' }}>
      { (imageSrc !== null) ? ( <Card.Img variant="top" src={ imageSrc } /> ) : null }
      <Card.Body>
        <Card.Title>{ title }</Card.Title>
        <Card.Text> { text } </Card.Text>
        <Button variant="warning" onClick={ editPost }>Edit</Button>
        <Button variant="danger" onClick={ deletePost }>Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default CardHomepage;

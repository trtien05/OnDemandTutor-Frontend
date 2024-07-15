import { useDocumentTitle } from '../../hooks';

const NotFound = () => {
    useDocumentTitle('Not Found Page | MyTutor');

    return <h1>Not Found Page</h1>;
};

NotFound.propTypes = {};

export default NotFound;

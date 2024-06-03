import { useDocumentTitle } from '../../hooks';

const NotFound = () => {
    useDocumentTitle('Không Tìm Thấy Trang | MyTutor');

    return <h1>Not Found Page</h1>;
};

NotFound.propTypes = {};

export default NotFound;

import { useDocumentTitle } from '../../hooks';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
    const { t } = useTranslation();
    useDocumentTitle(`${t('not_found_page_title')} | MyTutor`);

 return <h1>{t('not_found_page_title')}</h1>;
};



export default NotFound;

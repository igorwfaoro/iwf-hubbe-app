import { useEffect, useState } from 'react';
import Page from '../../components/Page/Page';
import { useToast } from '../../contexts/ToastContext';
import { createGithubService } from '../../services/github/github.service';
import Markdown from 'react-markdown';

interface AboutProps {}

export default function About({}: AboutProps) {
    const toast = useToast();
    const githubService = createGithubService();

    const [loading, setLoading] = useState(false);
    const [readmeContent, setReadmeContent] = useState<string>();

    useEffect(() => {
        getReadme();
    }, []);

    const getReadme = () => {
        setLoading(true);
        githubService
            .getRepoReadme()
            .then((response) => setReadmeContent(response))
            .catch(() => toast.show('Error getting content'))
            .finally(() => setLoading(false));
    };

    return (
        <Page>
            <Markdown className="prose">{readmeContent}</Markdown>
        </Page>
    );
}

import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import StoryTable from './components/StoryTable';
import { Input, Button } from '@chakra-ui/react';

function App() {
	const [storyData, setStoryData] = useState(null);
	const [urlData, setUrlData] = useState('');

	useEffect(() => {
		const getData = () => {
			axios({
				method: 'GET',
				url: '/home',
			})
				.then(response => {
					const res = response.data;
					setStoryData(res);
				})
				.catch(error => {
					if (error.response) {
						console.log(error.response);
						console.log(error.response.status);
						console.log(error.response.headers);
					}
				});
		};
		getData();
	}, []);

	const handleChange = e => {
		setUrlData(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios({
			url: '/create',
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			data: urlData,
		}).then(res => {
			const data = res.data;
			setStoryData([
				...storyData,
				{
					author: data.author,
					desc: data.desc,
					title: data.title,
					url: data.url,
					tags: data.tags,
				},
			]);
			setUrlData('');
		});
	};

	return (
		<div className='App'>
			<Header />
			<form onSubmit={handleSubmit}>
				<Input
					placeholder='Enter story URL'
					value={urlData}
					onChange={handleChange}
					maxW='md'
					borderRadius='md'
					mt='30px'
					mb='30px'
				/>
				<Button bg='#e5989b' type='submit'>
					+
				</Button>
			</form>

			<StoryTable story={storyData} />
		</div>
	);
}

export default App;

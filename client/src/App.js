import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

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
				{ author: data.author, desc: data.desc, title: data.title },
				...storyData,
			]);
			console.log(storyData);
		});
	};

	return (
		<div className='App'>
			<p> Enter story url </p>
			<form onSubmit={handleSubmit}>
				<input
					onChange={handleChange}
					type='text'
					name='urltext'
					value={urlData}
				></input>
				<button type='submit'>Submit</button>
			</form>
			{storyData &&
				storyData.map(story => {
					return (
						<div key={story.id}>
							<p>Story Name: {story.title}</p>
							<p>Author: {story.author}</p>
							<p>Summary: {story.desc}</p>
						</div>
					);
				})}
		</div>
	);
}

export default App;

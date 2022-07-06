import DataTable from 'react-data-table-component';

function StoryTable(story) {
	const stories = story.story;

	const customStyles = {
		table: {
			style: {
				width: '90%',
			},
		},
		tableWrapper: {
			style: {
				display: 'flex',
				justifyContent: 'center',
				paddingBottom: '20px',
			},
		},
		rows: {
			style: {
				fontSize: '15px',
				padding: '15px',
			},
		},
		headCells: {
			style: {
				fontWeight: 800,
				display: 'flex',
				justifyContent: 'center',
			},
		},
		cells: {
			style: {
				display: 'flex',
				justifyContent: 'center',
			},
		},
	};

	const columns = [
		{
			name: 'Title',
			selector: row => row.title,
			sortable: true,
		},
		{
			name: 'Summary',
			selector: row => row.desc,
			wrap: true,
			whiteSpace: 'wrap',
			grow: 3,
		},
		{
			name: 'Author',
			selector: row => row.author,
		},
	];
	const storyList = stories?.map(story => {
		return {
			id: story.id,
			title: story.title,
			desc: story.desc,
			author: story.author,
		};
	});

	const data = storyList;
	return (
		<>
			<DataTable columns={columns} data={data} customStyles={customStyles} />
		</>
	);
}

export default StoryTable;

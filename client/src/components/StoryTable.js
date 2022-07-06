import DataTable from 'react-data-table-component';
import { Tag, Box, Text } from '@chakra-ui/react';

function StoryTable(story) {
	const stories = story.story;

	const ExpandedComponent = ({ data }) => (
		<pre>{JSON.stringify(data, null, 2)}</pre>
	);

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
				padding: '10px',
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
			button: true,
			cell: row => (
				<Text as='a' fontSize='xl' href={row.url}>
					{row.title}
				</Text>
			),
			selector: row => row.title,
			sortable: true,
		},
		{
			name: 'Summary',
			selector: row => row.desc,
			cell: row => (
				<Text lineHeight='1.6' fontSize='sm'>
					{row.desc}
				</Text>
			),
			wrap: true,
			whiteSpace: 'wrap',
			grow: 3,
		},
		{
			name: 'Author',
			selector: row => row.author,
		},
		{
			name: 'Tags',
			selector: row => row.tags,
			cell: row => (
				<Box maxH='300px' overflowX='auto'>
					{row.tags.map(row => (
						<Tag m='5px'>{row}</Tag>
					))}
				</Box>
			),
		},
	];
	const storyList = stories?.map(story => {
		return {
			id: story.id,
			title: story.title,
			desc: story.desc,
			author: story.author,
			url: story.url,
			tags: story.tags.split(','),
		};
	});

	const data = storyList;
	return (
		<>
			<DataTable
				columns={columns}
				data={data}
				customStyles={customStyles}
				pagination
				expandableRows
				expandableRowsComponent={ExpandedComponent}
			/>
		</>
	);
}

export default StoryTable;

import React from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'
import { useDispatch } from "react-redux";
import { deletePost, likePost } from '../../../actions/posts';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlined from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment'

import useStyles from './styles'

const Post = ({ post, setCurrentId }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const user = JSON.parse(localStorage.getItem('profile'));

	const removePost = () => {
		dispatch(deletePost(post._id))
	}
	const like = () => {
		dispatch(likePost(post._id))
	}
	const Likes = () => {
		if (post.likeCount.length > 0) {
		  return post.likeCount.find((like) => like === (user?.result?.googleId || user?.result?._id))
			? (
			  <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likeCount.length > 2 ? `You and ${post.likeCount.length - 1} others` : `${post.likeCount.length} like${post.likeCount.length > 1 ? 's' : ''}` }</>
			) : (
			  <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likeCount.length} {post.likeCount.length === 1 ? 'Like' : 'Likes'}</>
			);
		}
	
		return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
	  }
	return (
		<Card className={classes.card}>
			<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
			<div className={classes.overlay}>
				<Typography variant="h6">{post.name}</Typography>
				<Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
			</div>
			<div className={classes.overlay2}>
				<Button style={{ color: 'white' }} size="small" onClick={() => setCurrentId(post._id)}>
					<MoreHorizIcon fontSize="medium" />
				</Button>
			</div>
			<div className={classes.details}>
				<Typography variant="body2" color="textSecondary" >{post.tags.map((tag) => `#${tag} `)}</Typography>
			</div>
			<Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
			<CardContent>
				<Typography variant="body1" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button size="small" color="primary" disabled={!user?.result} onClick={() => { like() }}>
					<Likes />
				</Button>
				<Button size="small" color="primary" onClick={() => { removePost() }}>
					<DeleteIcon fontSize="small" />
					&nbsp; Delete
				</Button>
			</CardActions>
		</Card>
	)
}

export default Post
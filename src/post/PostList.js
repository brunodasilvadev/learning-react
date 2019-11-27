import React, { useContext } from 'react'
import { StateContext } from '../contexts'

import Post from './Post'

export default function PostList() {
    const { state } = useContext(StateContext);
    const { posts } = state;

    return (
        <div>
            {
                posts.map((p, i) => (
                    <React.Fragment key={'post-' + i} >
                        <Post {...p} short={true} />
                        <hr />
                    </React.Fragment>
                ))
            }
        </div>
    )
}

// Em seguida, retornamos o componente <Post> 
// para cada postagem e passamos todas as chaves 
// do objeto de postagem, p, para o componente como acessórios. 
// Fazemos isso usando a sintaxe de propagação, 
// que tem o mesmo efeito de listar todas as chaves 
// do objeto manualmente como props, da seguinte maneira: 
// <Post title = {p.title} content = {p.content} author = {p. autor} />
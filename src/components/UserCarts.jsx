import React from 'react'

const UserCarts = ({githubUser}) => {
  return (
    <div>
       
      <div key={githubUser.id} className="card">
        <img
          src={githubUser.avatar_url}
          alt={githubUser.login}
          className="avatar"
        />

        <div className="card-body">
          <h3>{githubUser.name || githubUser.login}</h3>
          <p className="username">@{githubUser.login}</p>

          <div className="info">           
            <span className="repo">📦 Repo: <a href={githubUser.repos_url} target="_blank">{githubUser.repos_url}</a> </span>
          </div>

          <a
            href={githubUser.html_url}
            target="_blank"
            rel="noreferrer"
            className="profile-btn"
          >
            View Profile
          </a>
        </div>
      </div>
    
    </div>
  )
}

export default UserCarts
  
// js/index.js
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const reposList = document.getElementById('repos-list');
  
    searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const username = searchInput.value.trim();
      if (username !== '') {
        searchUser(username);
      }
    });
  
    async function searchUser(username) {
      try {
        const response = await fetch(`https://api.github.com/search/users?q=${username}`);
        const userData = await response.json();
        displayUsers(userData.items);
      } catch (error) {
        console.error('Error searching user:', error);
      }
    }
  
    async function getUserRepos(username) {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const reposData = await response.json();
        displayRepos(reposData);
      } catch (error) {
        console.error('Error fetching user repositories:', error);
      }
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const listItem = document.createElement('li');
        listItem.textContent = user.login;
        listItem.addEventListener('click', function() {
          getUserRepos(user.login);
        });
        userList.appendChild(listItem);
      });
    }
  
    function displayRepos(repos) {
      reposList.innerHTML = '';
      repos.forEach(repo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.full_name}</a>`;
        reposList.appendChild(listItem);
      });
    }
  });
  
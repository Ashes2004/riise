// API Service for Research Paper Management
const API_BASE_URL = 'http://127.0.0.1:8000/api/v1/research';

class ResearchService {


  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return response.json();
  }

  // GET /api/v1/research - Fetch all research papers
  async getAllPapers() {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'GET',
        credentials: 'include'
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching papers:', error);
      throw error;
    }
  }

  // POST /add-paper - Add a new research paper
  async addPaper(paperData) {
    try {
      const response = await fetch(`${API_BASE_URL}/add-paper`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(paperData)
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error adding paper:', error);
      throw error;
    }
  }

  // PUT /update-paper/:id - Update an existing research paper
  async updatePaper(paperId, paperData) {
    try {
      const response = await fetch(`${API_BASE_URL}/update-paper/${paperId}`, {
        method: 'PUT',
        credentials: 'include',
        body: JSON.stringify(paperData)
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error updating paper:', error);
      throw error;
    }
  }

  // DELETE /delete-paper/:id - Delete a research paper
  async deletePaper(paperId) {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-paper/${paperId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error deleting paper:', error);
      throw error;
    }
  }

  // GET /fetch-by-id/:id - Fetch research papers by Google Scholar ID
  async fetchByScholarId(scholarId) {
    try {
      const response = await fetch(`${API_BASE_URL}/fetch-by-id/${scholarId}`, {
        method: 'GET',
        credentials: 'include'
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching by Scholar ID:', error);
      throw error;
    }
  }

  // GET /fetch-by-name - Search for research papers by author name
  async fetchByAuthorName(authorName) {
    try {
      const response = await fetch(`${API_BASE_URL}/fetch-by-name?name=${encodeURIComponent(authorName)}`, {
        method: 'GET',
        credentials: 'include'
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching by author name:', error);
      throw error;
    }
  }

  // GET /paper/:id - Fetch a specific paper by ID
  async getPaperById(paperId) {
    try {
      const response = await fetch(`${API_BASE_URL}/paper/${paperId}`, {
        method: 'GET',
        credentials: 'include'
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error fetching paper by ID:', error);
      throw error;
    }
  }
}

export default new ResearchService();
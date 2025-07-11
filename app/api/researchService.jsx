const API_BASE_URL = 'https://riise.onrender.com/api/v1/research';

class ResearchService {

getAccessTokenFromCookie() {
    const match = document.cookie.match(/(?:^|; )access_token=([^;]*)/);
    if (match) {
      console.log("✅ access_token found in cookie:", decodeURIComponent(match[1]));
      return decodeURIComponent(match[1]);
    } else {
      console.warn("❌ access_token is not set in cookie.");
      return null;
    }
  }

  checkCookie() {
    const token = this.getAccessTokenFromCookie();
    if (!token) {
      console.warn("⚠️ Cookie does not contain access_token.");
    }
  }


  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
   
    
    return response.json();
  }

  async getAllPapers() {
    this.checkCookie(); // Check before request
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

  async addPaper(paperData) {
    this.checkCookie();
    try {
      const response = await fetch(`${API_BASE_URL}/add-paper`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paperData)
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error adding paper:', error);
      throw error;
    }
  }

  async updatePaper(paperId, paperData) {
    this.checkCookie();
      const updatedPaperData = {
      abstract: paperData.abstract,
      authors: paperData.authors,
      doi: paperData.doi,
      publication_date: paperData.publication_date,
      status: paperData.status,
      title: paperData.title
    };
    
    try {
      const response = await fetch(`${API_BASE_URL}/update-paper/${paperId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedPaperData)
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('Error updating paper:', error);
      throw error;
    }
  }

  async deletePaper(paperId) {
    this.checkCookie();
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

  async fetchByScholarId(scholarId) {
    this.checkCookie();
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

  async fetchByAuthorName(authorName) {
    this.checkCookie();
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

  async getPaperById(paperId) {
    this.checkCookie();
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

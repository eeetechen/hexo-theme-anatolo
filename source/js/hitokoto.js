class HitokotoLoader {
    constructor() {
      this.container = document.getElementById('hitokoto-container');
      this.textElement = document.getElementById('hitokoto');
      this.authorElement = document.getElementById('hitokoto-author');
      this.retryCount = 3;
      
      this.init();
    }
  
    init() {
      this.setMinimumHeight();
      this.loadHitokoto();
      this.addEventListeners();
    }
  
    setMinimumHeight() {
      const viewportHeight = window.innerHeight;
      this.container.style.minHeight = `${viewportHeight * 0.8}px`;
    }
  
    async loadHitokoto() {
      try {
        const response = await fetch('https://v1.hitokoto.cn');
        const data = await response.json();
        
        this.textElement.textContent = `"${data.hitokoto}"`;
        this.authorElement.textContent = data.from ? `—— ${data.from}` : '';
        
        this.container.classList.add('fade-in');
      } catch (error) {
        if(this.retryCount-- > 0) {
          setTimeout(() => this.loadHitokoto(), 2000);
        } else {
          this.textElement.textContent = '心灵需要片刻宁静...';
        }
      }
    }
  
    addEventListeners() {
      window.addEventListener('resize', () => this.setMinimumHeight());
      this.container.addEventListener('click', () => {
        this.container.classList.remove('fade-in');
        setTimeout(() => this.loadHitokoto(), 300);
      });
    }
  }
  
  // 初始化
  document.addEventListener('DOMContentLoaded', () => {
    new HitokotoLoader();
  });

export function setBootstrapCssDirection(isRTL: boolean) {
    const existingLink = document.getElementById('bootstrap-css') as HTMLLinkElement;    
    const href = isRTL
      ? '/node_modules/bootstrap/dist/css/bootstrap.rtl.min.css'
      : '/node_modules/bootstrap/dist/css/bootstrap.min.css';
  
    if (existingLink) {
      const existCssFile = getRelativePath(existingLink.href, '/bootstrap/dist/css/'); 
      const newCssFile = getRelativePath(href, '/bootstrap/dist/css/'); 
      if(existCssFile !== newCssFile){
        existingLink.href = href;
      }        
    } else {
      const link = document.createElement('link');
      link.id = 'bootstrap-css';
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }

  const getRelativePath = (fullPath: string, relativeStart:string): string => {
    const index = fullPath.lastIndexOf(relativeStart);
    return index !== -1 ? fullPath.substring(index) : '';
  };
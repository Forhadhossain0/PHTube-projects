const mainFunction = async () => {
  const res = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
  const data = await res.json();

  const divContainer = document.getElementById("div-container");
  data.data.forEach((mycategory) => {
    // console.log(mycategory)
    const div = document.createElement("div");
    div.style.paddingTop = "20px";
    div.innerHTML = `
      <div class="mt-5 mx-3 ">
      <a id="${mycategory.category_id}" class="btn btno border-none rounded  bg-slate-200 text-black  text-lg" onclick="handleId('${mycategory.category_id}')"> ${mycategory.category} </a>
      </div>
        `;
   divContainer.appendChild(div);
  });
  // console.log(data.data);

  
};
  


const handleId = async (categoryId) => {
  const res = await fetch( `https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
  const data = await res.json();
    console.log(categoryId)

    // drawing tab works is here
    const drawingContent = document.getElementById('drawingContent')
    drawingContent.innerHTML = '';
    if (categoryId === '1005') {
      drawingContent.innerHTML = `
      <figure class="text-center flex justify-center mx-auto p-10"><img src="Icon.png" alt=""></figure>
      <h1 class="text-4xl font-bold text-black "> Oops!! Sorry, There is no content here</h1>
      `
    } 
    // where stay all cards 
    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML=""; 

    data.data?.forEach((element) => {
      // this is posted date convert section 
    const second = element?.others?.posted_date ||' '; 
    const hour = Math.floor(second / 3600);
    const min = Math.floor((second % 3600) / 60);
    const post = hour === 0 && min === 0 ? ' ' : `${hour}hrs ${min}min ago`;

    // console.log(element)
    const divelement = document.createElement("div");
    divelement.classList.add('video-card')
    divelement.innerHTML = `
    <div class="card bg-none">

    <div class=" ">
    <img class="w-96 h-40 rounded" src=${element?.thumbnail}  />
    <h2 class="absolute ml-40 -mt-8  bg-gray-900  rounded w-2/5 h-4 text-[10px] text-center text-white ">  ${post}</h2> </div>  
    </div>

       <div class=" py-2 ">
        <div class=" flex ">
        <img class="w-8  rounded-full h-8 " src=${element?.authors?.map((x) =>{ 
                              return ` ${x.profile_picture}`
                              }).join('')  } />
     
          <div class="px-3 a">
                <h1 class=" text-black font-semibold text-xl">${element?.title}</h1>
                 <div> <p>${element?.authors?.map((x) =>{  return ` ${x.profile_name} ${x.verified? '<i class="fa fa-check-circle text-blue-500 font-size:16px px-1"></i>' : ' ' }  `
                 }).join('')  }</p> </div>

                <p class="ppp">${element?.others?.views} views</p> 

          </div>
        </div>     
     </div>
  </div>

    `;
    cardsContainer.appendChild(divelement);
  });

  const tabs = document.querySelectorAll('.btno');
  tabs.forEach(tab => { tab.classList.remove('active-tabs'); });

  const clickedTab = document.getElementById(categoryId);
  clickedTab.classList.add('active-tabs');
};


// Function to sort video cards by views
const sortVideoCardsByViews = () => {
      const videoCards = Array.from(document.getElementsByClassName("video-card"));
        videoCards.sort((a, b) => {
          const viewsA = parseInt(a.querySelector(".ppp").textContent.split("Views: ")[0]);
          const viewsB = parseInt(b.querySelector(".ppp").textContent.split("Views: ")[0]);
      
        return viewsB - viewsA;
    });
 

      const videoContainer = document.getElementById("cardsContainer");
      videoContainer.innerHTML=""; 

      videoCards.forEach((card) => {
          videoContainer.appendChild(card);
      });
  
    
  
  };




mainFunction();

handleId("1000") ;




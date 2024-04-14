export function bgprovider(weather){
    let backgroundUrl = ''
    switch (weather) {
        case "Clouds":
          backgroundUrl = 'https://cdn.pixabay.com/photo/2022/08/08/13/59/cloud-of-bunch-of-7372799_1280.jpg';
          break;
        case "Clear":
          backgroundUrl = 'https://images.pexels.com/photos/209831/pexels-photo-209831.jpeg?auto=compress&cs=tinysrgb&w=900&h=400&dpr=1';
          break;
        case "Rain":
          backgroundUrl = 'https://cdn.pixabay.com/photo/2014/04/05/11/39/rain-316579_1280.jpg';
          break;
        case "Drizzle":
          backgroundUrl = 'https://images.pexels.com/photos/7002970/pexels-photo-7002970.jpeg?auto=compress&cs=tinysrgb&w=900&h=400&dpr=1';
          break;
        case "Snow":
          backgroundUrl = 'https://images.unsplash.com/photo-1511131341194-24e2eeeebb09?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
          break;
        case "Tornado":
          backgroundUrl = 'https://cdn.pixabay.com/photo/2023/12/11/14/35/storm-8443707_1280.jpg';
          break;
        case "Dust":
          backgroundUrl ='https://cdn.pixabay.com/photo/2020/11/27/07/30/snowflakes-5781082_1280.jpg';
          break;
        case "Sand":
          backgroundUrl ='https://cdn.pixabay.com/photo/2020/11/27/07/30/snowflakes-5781082_1280.jpg';
          break;
        default:
          backgroundUrl = 'https://cdn.pixabay.com/photo/2020/03/07/11/54/the-fog-4909513_1280.jpg';
          break;
      }
      return backgroundUrl
}
import './sectors.scss';
import utilities from '../../helpers/utilities';
import sectorsData from '../../helpers/data/sectorsData';

const displaySectors = () => {
  sectorsData.sectorsDataBySectorId()
    .then((sectors) => {
      let domString = '';
      domString += `<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">`;
      sectors.forEach((sector) => {
        domString += `<img src="..." class="card-img" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${sector.name}</h5>
        <p class="card-text">${sector.info}</p>
        <p class="card-text"><small class="text-muted">${sector.size}</small></p>
        <button type="button" class="btn btn-light" od="update">Update</button>
        <button type="button" class="btn btn-danger" id="delete">Delete</button>
      </div>
    </div>
  </div>
</div>`;
      });
      utilities.printToDom('sectors', domString);
    })
    .catch((error) => console.error(error));
};

// const printAllBoards = (user) => {
//   boardsData.getMyBoards(user.uid)
//     .then((bords) => {
//       let domString = '<h1>Boards</h1>';
//       domString += '<div class="row" id="board-cards">';
//       bords.forEach((bord) => {
//         domString += `
//           <div class="col-sm-4">
//             <div class="card">
//             <button class="btn btn-danger delete" boardInfo="${bord.boardId}' id="${bord.boardId}-delete">Delete</button>
//               <div class="card-body">
//               <h5 class="card-title">${bord.boardName}</h5>
//               <button class="btn btn-primary boardClick" id="${bord.boardId}">View</button>
//               </div>
//             </div>
//           </div>
//           `;
//       });
//       domString += '</div>';
//       utilities.printToDom('boards', domString);
//       $('body').on('click', '.boardClick', addBoardClickEvent);
//       $('body').on('click', '.delete', deleteBoard);
//     })
//     .catch((error) => console.error(error));
// };

export default { displaySectors };

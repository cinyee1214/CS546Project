const userDetails = document.getElementById("userDetails");
const orderDetails = document.getElementById("orderDetails");
const Cosfooter = document.getElementById("Cosfooter");
const HPfooter = document.getElementById("HPfooter");

const id = JSON.parse(Cookies.get('user'))._id;

userDetails.hidden = true;

$('#orderInfo').click(() => {
    // if (!Cookies.get('cos') && !Cookies.get('hotpot')) {
    //     alert('Your order cart is empty!');
    //     return;
    // }

    userDetails.hidden = true;
    orderDetails.hidden = false;

});

$('#userInfo').click(() => {

    userDetails.hidden = false;
    orderDetails.hidden = true;

});

$('#userInfoUpdate').submit(async(event) => {
    event.preventDefault();

    console.log(id);

    const firstname = $('#firstname').val();
    const lastname = $('#lastname').val();
    const email = $('#emailid').val();
    const password = $('#passwordid').val();
    const cpassword = $('#cpasswordid').val();
    const telnum = $('#telnum').val();
    const address = $('#address').val();

    console.log(firstname);
    console.log(lastname);
    console.log(address);

    if (email) {
        JSON.parse(Cookies.get('user')).email = email;
    }

    try {
        await $.ajax({
            url: 'http://localhost:3000/users',
            type: 'PATCH',
            data: {
                userId: id,
                firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                cpassword: cpassword,
                telnum: telnum,
                address: address
            }
        });

        alert("Update successfully!");

    } catch (error) {
        alert(error['responseJSON']['error']);
    }
});

// const showHotPot = async() => {
//     try {
//         const hotpots = await $.ajax({
//             url: 'http://localhost:3000/users/hotpot',
//             type: 'GET'
//         });

//         if (hotpots.length > 0) {
//             HPfooter.hidden = true;
//         }

//         $('#orderHotPot').empty();

//         // $('#orderHotPot').html();

//         for (let i = 0; i < hotpots.length; ++i) {
//             const hotpot = hotpots[i];
//             var hotpotdiv;
//             if (hotpot.numofGuest < 4) {
//                 hotpotdiv = $(`
//                 <div class="hotpot">
//                     <img class="d-block img-fluid" src="img/1-3.png" alt="1-3">
//                     <div class="hotpotInfo">
//                         <p>Reservation ${i + 1}:</p>
//                         <p>Number of Guests: ${hotpot.numofGuest}</p>
//                         <p>Section: ${hotpot.section}</p>
//                         <p>Date: ${hotpot.date}</p>
//                     </div>
//                 </div>`);
//             } else {
//                 hotpotdiv = $(`
//                 <div class="hotpot">
//                     <img class="d-block img-fluid" src="img/4-6.png" alt="4-6">
//                     <div class="hotpotInfo">
//                         <p>Reservation ${i + 1}:</p>
//                         <p>Number of Guests: ${hotpot.numofGuest}</p>
//                         <p>Section: ${hotpot.section}</p>
//                         <p>Date: ${hotpot.date}</p>
//                     </div>
//                 </div>`);
//             }

//             const deleteBtn = $(
//                 `<button class="btn btn-sm" data-id="${hotpot._id}">
//                     <span class="fa fa-trash" aria-hidden="true"></span>
//                 </button>`
//             );

//             const editBtn = $(
//                 `<button class="btn btn-sm data-id="${hotpot._id}">
//                     <span class="fa-pencil-square-o" aria-hidden="true"></span>
//                 </button>`
//             );

//             deleteBtn.click(cancelHotPot);

//             editBtn.click((event) => {

//             });

//             $(hotpotdiv).append(deleteBtn)
//                 .append(editBtn);

//             $('#orderHotPot').append(hotpotdiv);
//         }


//     } catch (error) {
//         alert(error['responseJSON']['error']);
//     }
// };


const showCos = async() => {
    try {
        const dishes = await $.ajax({
            url: 'http://localhost:3000/users/cos',
            type: 'GET'
        });

        console.log(dishes);

        if (dishes.length > 0) {
            Cosfooter.hidden = true;
        }

        $('#orderCos').empty();

        for (let i = 0; i < dishes.length; ++i) {
            const dish = dishes[i];

            var dishdiv = $(`<br><div class="row orderCosDiv" ></div>`);
            // style="position: relative;"
            const editBtn = $(
                `<button class="btn editBtn btn-default" data-id="${dish._id}" >
                    <span class="fa fa-pencil-square-o" aria-hidden="true"></span>
                </button>`
            );
            // style="position: absolute; top: 0; right: 42px;"
            const deleteBtn = $(
                `<button type="button" class="btn deleteBtn btn-default" data-id="${dish._id}" >
                    <span class="fa fa-trash-o" aria-hidden="true"></span>
                </button>`
            );
            // style="position: absolute; top: 0; right: 0;"
            var imgProduct = getImageOfProdcut(dish.vegetable, dish.meat);
            var imgCH = getImageOfCH(dish.carbohydrate);
            var imgDiv = getImageOfDrink(dish.drink);

            var infoDiv = $(`<div class="dishInfo col-12 col-sm align-self-center">
                                <h5>Order ${i + 1}: ${dish.cookingStyle} ${dish.meat} with ${dish.vegetable}</h5>
                                <br>
                                <small>
                                    <p>Flavor: ${dish.flavor}</p>
                                    <p>Serving with: ${dish.carbohydrate} and ${dish.drink}</p>
                                </small>
                            </div>`);



            $(dishdiv).append(imgProduct).append(imgCH).append(imgDiv).append(infoDiv).append(editBtn).append(deleteBtn);

            deleteBtn.click();

            editBtn.click((event) => {

            });

            $('#orderCos').append(dishdiv);
        }

    } catch (error) {
        alert(error['responseJSON']['error']);
    }
};

const getImageOfProdcut = (veg, meat) => {
    var imgDiv;
    if (veg == 'Tomato') {
        if (meat == 'Beaf') {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/tmt_bf.png" alt="tmt_bf"></img>
            </div>`);
        } else if (meat == 'Pork') {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/tmt_pork.png" alt="tmt_pork"></img>
            </div>`);
        } else {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/tmt_ch.png" alt="tmt_ch"></img>
            </div>`);
        }
    } else if (veg == 'Potato') {
        if (meat == 'Beaf') {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/ptt_bf.png" alt="ptt_bf"></img>
            </div>`);
        } else if (meat == 'Pork') {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/ptt_pork.png" alt="ptt_pork"></img>
            </div>`);
        } else {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/ptt_ch.png" alt="ptt_ch"></img>
            </div>`);
        }
    } else if (veg == 'Mushroom') {
        if (meat == 'Beaf') {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/mr_bf.png" alt="mr_bf"></img>
            </div>`);
        } else if (meat == 'Pork') {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/mr_pork.png" alt="mr_pork"></img>
            </div>`);
        } else {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/mr_ch.png" alt="mr_ch"></img>
            </div>`);
        }
    } else {
        if (meat == 'Beaf') {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/eg_bf.png" alt="eg_bf"></img>
            </div>`);
        } else if (meat == 'Pork') {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/eg_pork.png" alt="eg_pork"></img>
            </div>`);
        } else {
            imgDiv = $(`
            <div class="col-12 col-sm-2 cosImgDiv">
                <img class="d-block img-fluid" src="img/eg_ch.png" alt="eg_ch"></img>
            </div>`);
        }
    }
    return imgDiv;
};

const getImageOfCH = (carbohydrate) => {
    var imgDiv;
    if (carbohydrate == 'Rice') {
        imgDiv = $(`
                    <div class="col-12 col-sm-2 column">
                        <img class="d-block img-fluid" src="img/rice.png" alt="rice"></img>
                    </div>`);
    } else {
        imgDiv = $(`
                    <div class="col-12 col-sm-2 column">
                    <img class="d-block img-fluid" src="img/noodles.png" alt="noodles"></img>
                    </div>`);
    }
    return imgDiv;
};

const getImageOfDrink = (drink) => {
    var imgDiv;
    if (drink == 'Milk') {
        imgDiv = $(`
                    <div class="col-12 col-sm-2 column">
                        <img class="d-block img-fluid" src="img/milk.png" alt="milk"></img>
                    </div>`);
    } else {
        imgDiv = $(`
                    <div class="col-12 col-sm-2 column">
                    <img class="d-block img-fluid" src="img/soda.png" alt="soda"></img>
                    </div>`);
    }
    return imgDiv;
};

showCos();
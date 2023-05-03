import "./main.css";
import { useEffect, useState } from "react";
import data, { hangGhe } from "./data/danhSachGhe";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "./redux/cartItemSlice";
import { sortItems } from "./redux/cartItemSlice";

const App = () => {
  const cartItems = useSelector((state) => state.cartItems.value);
  const [chooseItem, setChooseItem] = useState();
  const [itemCot, setItemCot] = useState();

  const dispatch = useDispatch();

  const handleBookingTicket = () => {
    dispatch(addItem(chooseItem));
  };
  const handleRemoveItem = (e, item, hang, i) => {
    const upd_obj = itemCot?.map((obj) => {
      if (obj.hang === hang) {
        obj.danhSachGhe[i] = {
          soGhe: item.soGhe,
          gia: item.gia,
          daDat: false,
        };
      }
      return obj;
    });
    dispatch(removeItem(upd_obj));
  };
  const handleCheckboxChange = (e, item, hang, i) => {
    const upd_obj = chooseItem?.map((obj) => {
      if (obj.hang === hang) {
        obj.danhSachGhe[i] = {
          soGhe: item.soGhe,
          gia: item.gia,
          daDat: e.target.checked,
        };
      }
      return obj;
    });
    setChooseItem(upd_obj);
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(data));
  }, []);

  useEffect(() => {
    setChooseItem(JSON.parse(localStorage.getItem("cartItems")));
    setItemCot(JSON.parse(localStorage.getItem("cartItems")));
  }, [cartItems]);

  return (
    <div className="App">
      <div className="body">
        <div className="booking-container col-8">
          <div className="screen">
            <h1 className="firstChar">Đặt vé xem phim</h1>
            Màn hình
          </div>
          <div className="seat-container">
            <table id="seatsBlock">
              <thead>
                <tr>
                  <td>
                    <span className="seat-char mr-20"></span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">1</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">2</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">3</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">4</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">5</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">6</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">7</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">8</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">9</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">10</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">11</span>
                  </td>
                  <td>
                    <span className="seat-char mr-20">12</span>
                  </td>
                </tr>
              </thead>
              <tbody>
                {cartItems?.map((item, index) => (
                  <tr className="seat-char" key={item.hang}>
                    {" "}
                    <td>
                      <span className="seat-num">{item.hang}</span>
                    </td>
                    {item?.danhSachGhe?.map((values, i) => (
                      <td key={values.soGhe}>
                        {values?.daDat ? (
                          <div className="guide-color reserved"></div>
                        ) : (
                          <input
                            onChange={(e) =>
                              handleCheckboxChange(
                                e,
                                item.danhSachGhe[i],
                                item.hang,
                                i
                              )
                            }
                            type="checkbox"
                            className="seats"
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="btn-onclick">
              <button className="submit" onClick={handleBookingTicket}>
                Đặt vé
              </button>
            </div>
          </div>
        </div>
        <div className="payment-container col-4">
          <h1 className="firstChar" style={{ color: "white" }}>
            DANH SÁCH GHẾ BẠN CHỌN
          </h1>
          <div className="guides">
            <div className="guide-container">
              <div
                className="guide-color reserved"
                style={{ marginLeft: "0" }}
              ></div>
              Ghế đã đặt
            </div>
            <div className="guide-container">
              <div className="guide-color selected"></div>Ghế đang chọn
            </div>
            <div className="guide-container">
              <div className="guide-color not-reserved"></div>Ghế chưa đặt
            </div>
          </div>
          <table id="paymentTable">
            <thead>
              <tr>
                <td>Số ghế</td>
                <td>Giá</td>
                <td>Hủy</td>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => (
                <>
                  {item.danhSachGhe.map((val, i) => (
                    <>
                      {val?.daDat === true && (
                        <tr>
                          <td>{val.soGhe}</td>
                          <td>{val.gia}</td>
                          <td>
                            <input
                              onChange={(e) => {
                                handleRemoveItem(
                                  e,
                                  item.danhSachGhe[i],
                                  item.hang,
                                  i
                                );
                              }}
                              type="checkbox"
                              className="seats"
                            />
                          </td>
                        </tr>
                      )}
                    </>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;

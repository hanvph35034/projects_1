import { useNewOrderMutation } from "@/api/order";
import { createPaymentUrl, useNewPaymentMutation } from "@/api/payment";
import { useDecreaseSaleMutation, useGetAllSalesQuery } from "@/api/sale/sale.api";
import { removeMultiplePrdCart } from "@/store/cart/cart.slice";
import { useAppDispatch } from "@/store/hook";
import { ISale } from "@/types";
import { Input } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : {};

const Orderr = () => {
    const [selectedSale, setSelectedSale] = useState<ISale>({} as any);
    const [paymentMethod, setPaymentMethod] = useState<"cash" | "banking">("banking");
    const [infoCart, setInfoCart] = useState<any>([]);
    const [address, setAddress] = useState<string>("");

    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { data } = useGetAllSalesQuery();
    const [newPayment] = useNewPaymentMutation();
    const [newOrder] = useNewOrderMutation();
    const [decreaseSale] = useDecreaseSaleMutation();

    const handlePickSale = (sale: ISale) => {
        if (selectedSale?._id === sale._id) return setSelectedSale({} as any);
        setSelectedSale(sale);
    };

    const handlePayment = () => {
        Swal.fire({
            position: "center",
            title: "Warning",
            text: "Bạn chắc chắn muốn thanh toán chứ!!",
            icon: "warning",
            confirmButtonText: "Đồng ý",
            showDenyButton: true,
            returnInputValueOnDeny: false,
            denyButtonText: "Cancel",
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    if (paymentMethod === "banking") {
                        const infoBanking = {
                            vnp_OrderInfo: "Thanh toán đơn hàng",
                            totalPrice: infoCart?.totalPrice - saleMoney || 0,
                            bank_code: "",
                            language: "vn",
                            // Mấy bạn lấy userId lúc đăng nhập truyên vào
                            user: "6533936415fe0386e84bf4b9",
                        };
                        const result = await createPaymentUrl(infoBanking);
                        window.open(result.data.url_redirect, "_self");
                    }

                    if (paymentMethod === "cash") {
                        const infoBanking = {
                            totalPrice: infoCart?.totalPrice || 0,
                            // Mấy bạn lấy userId lúc đăng nhập truyên vào
                            user: "6533936415fe0386e84bf4b9",
                            payment_method: "cash",
                            message: "Thanh toan don hang",
                            status: "pending",
                        };
                        const newPaymentResult = await newPayment(infoBanking as any).unwrap();
                        const infoOrder = {
                            // Laays id user danwg nhap
                            user_id: "65465224dc28e240806b6c74",
                            address: address || 'dia chi',
                            payment_id: newPaymentResult.data._id,
                            products: infoCart?.cartSelected?.map((cart: any) => ({ product_id: cart._id, quantity: cart.quantity })) || [],
                            total_price: infoCart?.totalPrice - saleMoney || 0,
                        };

                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        const orderResult = await newOrder(infoOrder as any).unwrap();
                        dispatch(removeMultiplePrdCart(infoCart?.cartSelected?.map((cart: any) => cart._id) as any));
                        // Cos thể send mail bill ở đây
                        navigate("/order-history");
                        toast.success("Đặt hàng thành công");
                        if (selectedSale._id) {
                            decreaseSale(selectedSale._id);
                        }
                        sessionStorage.removeItem("infoPayment");
                    }
                }
            } catch (error: any) {
                toast.error(error?.data?.message);
            }
        });
    };

    const saleMoney = selectedSale?._id
        ? selectedSale.type === "cash"
            ? infoCart?.totalPrice - +selectedSale.sale
            : (infoCart?.totalPrice * +selectedSale.sale) / 100
        : 0;

    useEffect(() => {
        const _infoCart = JSON.parse(sessionStorage.getItem("infoPayment") || "");
        if (_infoCart) setInfoCart(_infoCart);
    }, []);


    useEffect(() => {

        const dataCreateCart = {
            "user_id": user?._id,
            "status": "pending", // Bạn có thể bỏ qua trường này để sử dụng giá trị mặc định "pending"
            "products": [
                {
                    "product_id": "6587df74fc458b6a9a7a41e1",
                    "color": "#d23030",
                    "size": "38",
                    "quantity": 2
                },
                {
                    "product_id": "6587df84fc458b6a9a7a41e2",
                    "color": "#cf3f3f",
                    "size": "37",
                    "quantity": 2
                }
            ],
            "total_price": 1222,
            "address": "Địa chỉ của bạn",
            "sale_id": "6555018adbb1621a26e79a3e"
        };

        console.log('infoCart', dataCreateCart, user, infoCart.cartSelected)
    }, []);

    useEffect(() => {
        const handleNewBooking = async () => {
            const paymentId = searchParams.get("payment_id");
            if (paymentId) {
                const infoOrder = {
                    user_id: "65465224dc28e240806b6c74",
                    address: address || 'dia chi',
                    payment_id: paymentId,
                    products: infoCart?.cartSelected?.map((cart: any) => ({ product_id: cart._id, quantity: cart.quantity })) || [],
                    total_price: infoCart?.totalPrice - saleMoney || 0,
                };
                // Show Loading
                await newOrder(infoOrder as any).unwrap();
                sessionStorage.removeItem("infoPayment");
                dispatch(removeMultiplePrdCart(infoCart?.cartSelected?.map((cart: any) => cart._id) as any));
                if (selectedSale._id) {
                    decreaseSale(selectedSale._id);
                }
                // Cos thể send mail bill ở đây
                navigate("/order-history");
                toast.success("Đặt hàng thành công");
            }
        };
        handleNewBooking();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams.get("payment_id")]);
    return (
        <div className="mx-5">
            <h3 className="text-x text-[#222] text-center font-bold tracking-wider my-5">Thông Tin Đơn Hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 ">
                <div className="md:col-span-2 ">
                    <div className="overflow-x-auto mx-10">
                        <table className=" table min-w-full divide-y-2 divide-gray-200 bg-white text-sm ">
                            <thead className="ltr:text-left rtl:text-right  ">
                                <tr>
                                    {/* <th className="whitespace-nowrap py-4 px-1 font-medium text-gray-900 text-left text:xs lg:text-xl">Ảnh</th> */}
                                    <th className="whitespace-nowrap py-4  px-1  font-medium text-gray-900 text-left text:xs lg:text-xl">Tên</th>
                                    <th className="whitespace-nowrap py-4  px-1  font-medium text-gray-900 text-left text:xs lg:text-xl">Loại</th>
                                    <th className="whitespace-nowrap py-4 px-1  font-medium text-gray-900 text-left text:xs lg:text-xl">Số Lượng</th>
                                    <th className="whitespace-nowrap py-4 px-1  font-medium text-gray-900 text-left text:xs lg:text-xl">Giá</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-200 ">
                                {infoCart?.cartSelected?.map((cart: any) => (
                                    <tr className="" key={cart._id}>
                                        <td className="whitespace-nowrap font-medium text-gray-900 flex text-left py-4">
                                            {/* <div className="relative w-[200px]">
                                                <img className="w-full h-auto lg:w-40 object-cover md:w-40" src={cart?.product?.image[0]} alt="" />
                                            </div> */}
                                        </td>
                                        <td className="whitespace-nowrap font-medium text-gray-900 flex text-left py-4">
                                            <p className="text-xs lg:text-xl md:text-xl">{cart.product.name}</p>
                                        </td>
                                        <td className="whitespace-nowrap  text-gray-700 py-4 ">
                                            <div className=" items-center ">
                                                <div className="flex items-center gap-1">
                                                    <span className="text-xs lg:text-base md:text-xl ">Màu:</span>
                                                    <span className=" bg-yellow-500 flex  gap-3 rounded-full w-4 h-4 opacity-70"></span>
                                                </div>
                                            </div>
                                            <span className="  gap-3 text-xs lg:text-base md:text-xl">Size: S</span>
                                        </td>
                                        <td className="whitespace-nowrap text-gray-700 py-4 px-4">{cart.quantity}</td>
                                        <td className=" whitespace-nowrap  text-gray-700  text-xs lg:text-xl md:text-xl py-4 px-1 ">
                                            {infoCart?.totalPrice?.toLocaleString() || 0} VNĐ
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="col-span-1 mx-10 ">
                    <div className="mt-4 border border-green-500 rounded-md p-2">
                        <h3 className="text-xl font-semibold">Thông tin thanh toán</h3>

                        <div className="mt-4 space-y-2">
                            <div>Trạng thái đơn : {saleMoney?.toLocaleString() || 0}</div>
                            <div>Số lượng sp : 2 </div>
                            <div>Số điên thoại : 0976594507 </div>
                            <div>Địa chỉ : 0976594507 </div>
                            <hr></hr>
                            <h1><b><div>Thanh toán: {infoCart?.totalPrice?.toLocaleString() || 0}</div></b></h1>
                        </div>
                    </div>

                    <div className="mt-4 col-span-1 ">
                        <div className="">
                            <div className="border-2 p-2">
                                <h3 className="font-bold px-3">Thông tin điều khoản </h3>
                                <div className="m-5 flex-col">
                                    Bằng cách đặt đơn hàng, bạn dồng ý với điều khoản sủ dụng và bán hàng của sneakerStore và xác nhận rằng bạn đã đọc
                                    chính sách quyền riêng tư{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orderr;

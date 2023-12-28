import { Carrier, Carrier1, Carrier2 } from "../../../components/Icon/iconProject"

const HeaderHomeInfo = () => {
  return (
<div className="text-icn-blocks-bg-row bg-[#282828] grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-8 items-center mb-10 pr-20 pl-20 pt-16 pb-16 gap-10 md:flex-row ">
					<div className="flex item-center text-icn-block-footer">
						<div className="icn mr-5">
                         <Carrier></Carrier>
						</div>
						<div className="text-white">
							<h4 className="font-bold mb-2">Extra fast delivery</h4>
							<p className="text-sm">Your order will be delivered 3-5 business  days after all of your items are available</p>
						</div>
					</div>
					<div className="text-icn-block-footer flex item-center">
          <div className="icn mr-5">
		                <Carrier1></Carrier1>
						</div>
						<div className="text-white ">
							<h4 className="font-bold mb-2">Best price</h4>
							<p className="text-sm">We'll match the product prices of key online and local competitors for immediately</p>
						</div>
					</div>
					<div className="text-icn-block-footer flex item-center">
						<div className="icn mr-5">
						<Carrier2></Carrier2>
						</div>
						<div className="text-white">
							<h4 className="font-bold mb-2">Guarantee</h4>
							<p className="text-sm">If the item you want is available, we can process a return and place a new order</p>
						</div>
					</div>
				</div>
  )
}

export default HeaderHomeInfo
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { getOrdersByEmail } from "@/lib/supabaseOrders";
import { Package, Calendar, Tag, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default async function MyOrdersPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const email = session.user.email;
  
  const orders = await getOrdersByEmail(email);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 hover-blur-none">
          <div>
            <h1 className="font-serif text-4xl md:text-5xl text-foreground mb-4">My Orders</h1>
            <p className="text-foreground/60 max-w-xl">
              Hello, {session.user.name.split(' ')[0]}. Here is a record of all the handcrafted pieces you've reserved or purchased.
            </p>
          </div>
          <Link href="/shop">
            <Button variant="secondary" className="gap-2">
              <Package size={16} /> Shop New Art
            </Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="py-20 text-center border border-foreground/5 rounded-sm bg-white/50">
            <Package size={48} className="mx-auto text-foreground/20 mb-6" strokeWidth={1} />
            <h2 className="text-2xl font-serif text-foreground mb-4">No Orders Yet</h2>
            <p className="text-foreground/60 mb-8 max-w-sm mx-auto">
              You haven't placed any orders yet. Explore our collection of premium handmade art.
            </p>
            <Link href="/shop">
              <Button>Browse Collection</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, i) => (
              <div 
                key={i} 
                className="bg-white border border-foreground/5 shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-12"
              >
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4 border-b border-foreground/5 pb-4">
                    <h3 className="font-sans font-semibold tracking-wide uppercase text-sm text-foreground">
                      Order #{order.orderId}
                    </h3>
                    <span className="px-3 py-1 bg-[#25D366]/10 text-[#128C7E] text-[10px] uppercase font-bold tracking-widest rounded-sm">
                      {order.status}
                    </span>
                    <span className="px-3 py-1 bg-foreground/5 text-foreground/60 text-[10px] uppercase font-bold tracking-widest rounded-sm">
                      {order.paymentMethod}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-foreground/40 text-xs uppercase tracking-wider font-semibold">
                        <Calendar size={12} /> Date
                      </div>
                      <p className="text-sm font-medium text-foreground/80">{order.date}</p>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-foreground/40 text-xs uppercase tracking-wider font-semibold">
                        <Tag size={12} /> Total Amount
                      </div>
                      <p className="text-sm font-medium text-foreground/80">{order.amount}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="text-foreground/40 text-xs uppercase tracking-wider font-semibold mb-2">Items</div>
                    <p className="text-sm leading-relaxed text-foreground/70">{order.items}</p>
                  </div>
                </div>

                <div className="flex md:flex-col justify-end md:justify-center border-t md:border-t-0 md:border-l border-foreground/5 pt-6 md:pt-0 md:pl-12 gap-3">
                  <Link href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=Hello,%20I'm%20checking%20on%20my%20order%20(${order.orderId}).`} target="_blank">
                    <Button variant="secondary" className="w-full text-xs gap-2 h-12">
                      Get Help <ExternalLink size={14} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

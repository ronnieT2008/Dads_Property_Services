const Customer = ({ name, phone, address, quotes }) => {
    const totalSum = quotes.reduce((sum, quote) => {
        const total = parseFloat(quote.total) || 0;
        return sum + total;
    }, 0);

    return (
        <div className="bg-white shadow-md border border-slate-300 rounded-lg p-6 space-y-4 col-span-1 sm:col-span-2 xl:col-span-3">
            <div className="border-b pb-4">
                <p className="text-2xl font-semibold mb-2 ml-4">🧾 {name}</p>
                <p className="text-base font-medium">📞 Phone: <span className="font-normal">{phone}</span></p>
                <p className="text-base font-medium">🏠 Address: <span className="font-normal">{address}</span></p>
                <p className="text-sm text-green-600 mt-1 font-semibold">💵 Total Amount: ${totalSum.toFixed(2)}</p>
                <p className="text-sm text-slate-500 mt-1">🗂️ Total Quotes: {quotes.length}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {quotes.map((quote, idx) => (
                    <div key={idx} className="bg-slate-100 p-4 rounded-lg border border-slate-300 shadow-sm">
                        <p><span className="font-medium">📌 Room:</span> {quote.roomName}</p>
                        <p><span className="font-medium">💰 Total:</span> ${parseFloat(quote.total || 0).toFixed(2)}</p>
                        <p><span className="font-medium">📅 Date:</span> {new Date(quote.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Customer;
const fs = require('fs');

let file = fs.readFileSync('src/PublicWebsite.tsx', 'utf8');

const dynamicRooms = `
          {publicData?.rooms?.map((room: any, idx: number) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden group hover:border-primary/30 transition-colors backdrop-blur-sm"
            >
              <div className="relative h-[250px] overflow-hidden bg-white/5">
                {room.images && room.images.length > 0 ? (
                  <img src={room.images[0]} alt={room.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20"><span className="font-serif">No Image</span></div>
                )}
                {room.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-black px-4 py-1 text-xs font-bold tracking-widest uppercase rounded shadow-[0_0_10px_rgba(212,175,55,0.4)]">
                    Featured
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-4 py-1 text-xs font-bold tracking-widest uppercase rounded border border-white/10">
                  ₹{room.price} / Night
                </div>
              </div>
              <div className="p-8">
                <h4 className="text-2xl font-serif font-bold text-white mb-3">{room.name}</h4>
                <p className="text-white/70 mb-6 font-light">
                  {room.type} • Capacity: {room.capacity}
                </p>
                <ul className="grid grid-cols-2 gap-3 mb-8">
                  {room.amenities?.map((am: string, i: number) => (
                    <li key={i} className="flex items-center text-sm text-white/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {am}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="block w-full py-3 border border-primary text-primary text-center rounded hover:bg-primary hover:text-black transition-all text-sm tracking-[0.2em] uppercase">
                  Book Now
                </a>
              </div>
            </motion.div>
          ))}
`;

const startMarker = '<div className="grid md:grid-cols-2 gap-10">';
const regex = /<div className="grid md:grid-cols-2 gap-10">[\s\S]*?(?=<\/div>\s*<\/div>\s*<\/section>)/;

if (file.match(regex)) {
  file = file.replace(regex, `<div className="grid md:grid-cols-2 gap-10">\n${dynamicRooms}`);
  fs.writeFileSync('src/PublicWebsite.tsx', file);
  console.log('Patched rooms!');
} else {
  console.log('Could not find rooms grid');
}

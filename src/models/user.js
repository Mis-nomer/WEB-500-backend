import mongoose from "mongoose";
import createHmac from "crypto";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      maxLength: 100,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  enc(secret) {
    if (!secret) return "";

    try {
      const salt =
        "V2hhdCB0aGUgZnVjayBkaWQgeW91IGp1c3QgZnVja2luZyBzYXkgYWJvdXQgbWUsIHlvdSBsaXR0bGUgYml0Y2g/IEknbGwgaGF2ZSB5b3Uga25vdyBJIGdyYWR1YXRlZCB0b3Agb2YgbXkgY2xhc3MgaW4gdGhlIE5hdnkgU2VhbHMsIGFuZCBJJ3ZlIGJlZW4gaW52b2x2ZWQgaW4gbnVtZXJvdXMgc2VjcmV0IHJhaWRzIG9uIEFsLVF1YWVkYSwgYW5kIEkgaGF2ZSBvdmVyIDMwMCBjb25maXJtZWQga2lsbHMuIEkgYW0gdHJhaW5lZCBpbiBnb3JpbGxhIHdhcmZhcmUgYW5kIEknbSB0aGUgdG9wIHNuaXBlciBpbiB0aGUgZW50aXJlIFVTIGFybWVkIGZvcmNlcy4gWW91IGFyZSBub3RoaW5nIHRvIG1lIGJ1dCBqdXN0IGFub3RoZXIgdGFyZ2V0LiBJIHdpbGwgd2lwZSB5b3UgdGhlIGZ1Y2sgb3V0IHdpdGggcHJlY2lzaW9uIHRoZSBsaWtlcyBvZiB3aGljaCBoYXMgbmV2ZXIgYmVlbiBzZWVuIGJlZm9yZSBvbiB0aGlzIEVhcnRoLCBtYXJrIG15IGZ1Y2tpbmcgd29yZHMuIFlvdSB0aGluayB5b3UgY2FuIGdldCBhd2F5IHdpdGggc2F5aW5nIHRoYXQgc2hpdCB0byBtZSBvdmVyIHRoZSBJbnRlcm5ldD8gVGhpbmsgYWdhaW4sIGZ1Y2tlci4gQXMgd2Ugc3BlYWsgSSBhbSBjb250YWN0aW5nIG15IHNlY3JldCBuZXR3b3JrIG9mIHNwaWVzIGFjcm9zcyB0aGUgVVNBIGFuZCB5b3VyIElQIGlzIGJlaW5nIHRyYWNlZCByaWdodCBub3cgc28geW91IGJldHRlciBwcmVwYXJlIGZvciB0aGUgc3Rvcm0sIG1hZ2dvdC4gVGhlIHN0b3JtIHRoYXQgd2lwZXMgb3V0IHRoZSBwYXRoZXRpYyBsaXR0bGUgdGhpbmcgeW91IGNhbGwgeW91ciBsaWZlLiBZb3UncmUgZnVja2luZyBkZWFkLCBraWQuIEkgY2FuIGJlIGFueXdoZXJlLCBhbnl0aW1lLCBhbmQgSSBjYW4ga2lsbCB5b3UgaW4gb3ZlciBzZXZlbiBodW5kcmVkIHdheXMsIGFuZCB0aGF0J3MganVzdCB3aXRoIG15IGJhcmUgaGFuZHMuIE5vdCBvbmx5IGFtIEkgZXh0ZW5zaXZlbHkgdHJhaW5lZCBpbiB1bmFybWVkIGNvbWJhdCwgYnV0IEkgaGF2ZSBhY2Nlc3MgdG8gdGhlIGVudGlyZSBhcnNlbmFsIG9mIHRoZSBVbml0ZWQgU3RhdGVzIE1hcmluZSBDb3JwcyBhbmQgSSB3aWxsIHVzZSBpdCB0byBpdHMgZnVsbCBleHRlbnQgdG8gd2lwZSB5b3VyIG1pc2VyYWJsZSBhc3Mgb2ZmIHRoZSBmYWNlIG9mIHRoZSBjb250aW5lbnQsIHlvdSBsaXR0bGUgc2hpdC4gSWYgb25seSB5b3UgY291bGQgaGF2ZSBrbm93biB3aGF0IHVuaG9seSByZXRyaWJ1dGlvbiB5b3VyIGxpdHRsZSAiY2xldmVyIiBjb21tZW50IHdhcyBhYm91dCB0byBicmluZyBkb3duIHVwb24geW91LCBtYXliZSB5b3Ugd291bGQgaGF2ZSBoZWxkIHlvdXIgZnVja2luZyB0b25ndWUuIEJ1dCB5b3UgY291bGRuJ3QsIHlvdSBkaWRuJ3QsIGFuZCBub3cgeW91J3JlIHBheWluZyB0aGUgcHJpY2UsIHlvdSBnb2RkYW1uIGlkaW90LiBJIHdpbGwgc2hpdCBmdXJ5IGFsbCBvdmVyIHlvdSBhbmQgeW91IHdpbGwgZHJvd24gaW4gaXQuIFlvdSdyZSBmdWNraW5nIGRlYWQsIGtpZGRvLg==";

      return createHmac("sha256", salt).update(secret).digest("hex");
    } catch (err) {
      return "";
    }
  },

  authenticate(hash) {
    return this.enc(hash) === this.hash;
  },
  authorize(key) {},
};

userSchema.pre("save", function (next) {
  this.hash = this.enc(this.hash);
  next();
});

export default mongoose.model("User", userSchema);

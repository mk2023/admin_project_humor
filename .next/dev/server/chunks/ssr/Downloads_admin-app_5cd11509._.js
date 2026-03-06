module.exports = [
"[project]/Downloads/admin-app/lib/supabase/supabaseAdmin.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "createAdminClient",
    ()=>createAdminClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/Downloads/admin-app/node_modules/@supabase/supabase-js/dist/index.mjs [app-rsc] (ecmascript) <locals>");
;
function createAdminClient() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f40$supabase$2f$supabase$2d$js$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["createClient"])(("TURBOPACK compile-time value", "https://qihsgnfjqmkjmoowyfbn.supabase.co"), process.env.SUPABASE_SERVICE_ROLE_KEY);
}
}),
"[project]/Downloads/admin-app/app/actions/createImage.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"40afad8175d76a73eafb1459e83525d49d2df88ecf":"createImage"},"",""] */ __turbopack_context__.s([
    "createImage",
    ()=>createImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$lib$2f$supabase$2f$supabaseAdmin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/lib/supabase/supabaseAdmin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function createImage(data) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$lib$2f$supabase$2f$supabaseAdmin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data: image, error } = await supabase.from("images").insert(data).select().single();
    if (error) throw new Error(error.message);
    return image;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createImage
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createImage, "40afad8175d76a73eafb1459e83525d49d2df88ecf", null);
}),
"[project]/Downloads/admin-app/app/actions/updateImage.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"602605a73ca57ab37a4b45b7d1f9d3be439a2e62de":"updateImage"},"",""] */ __turbopack_context__.s([
    "updateImage",
    ()=>updateImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$lib$2f$supabase$2f$supabaseAdmin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/lib/supabase/supabaseAdmin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function updateImage(id, data) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$lib$2f$supabase$2f$supabaseAdmin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { data: image, error } = await supabase.from("images").update(data).eq("id", id).select().single();
    if (error) throw new Error(error.message);
    return image;
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    updateImage
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateImage, "602605a73ca57ab37a4b45b7d1f9d3be439a2e62de", null);
}),
"[project]/Downloads/admin-app/app/actions/deleteImage.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"4021ec308bf6c1bea34b891913b8ac6c6209ff963f":"deleteImage"},"",""] */ __turbopack_context__.s([
    "deleteImage",
    ()=>deleteImage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$lib$2f$supabase$2f$supabaseAdmin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/lib/supabase/supabaseAdmin.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
async function deleteImage(id) {
    const supabase = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$lib$2f$supabase$2f$supabaseAdmin$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createAdminClient"])();
    const { error } = await supabase.from("images").delete().eq("id", id);
    if (error) throw new Error(error.message);
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    deleteImage
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(deleteImage, "4021ec308bf6c1bea34b891913b8ac6c6209ff963f", null);
}),
"[project]/Downloads/admin-app/.next-internal/server/app/admin/images/page/actions.js { ACTIONS_MODULE0 => \"[project]/Downloads/admin-app/app/actions/createImage.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Downloads/admin-app/app/actions/updateImage.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Downloads/admin-app/app/actions/deleteImage.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$createImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/app/actions/createImage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$updateImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/app/actions/updateImage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$deleteImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/app/actions/deleteImage.ts [app-rsc] (ecmascript)");
;
;
;
}),
"[project]/Downloads/admin-app/.next-internal/server/app/admin/images/page/actions.js { ACTIONS_MODULE0 => \"[project]/Downloads/admin-app/app/actions/createImage.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE1 => \"[project]/Downloads/admin-app/app/actions/updateImage.ts [app-rsc] (ecmascript)\", ACTIONS_MODULE2 => \"[project]/Downloads/admin-app/app/actions/deleteImage.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "4021ec308bf6c1bea34b891913b8ac6c6209ff963f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$deleteImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["deleteImage"],
    "40afad8175d76a73eafb1459e83525d49d2df88ecf",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$createImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createImage"],
    "602605a73ca57ab37a4b45b7d1f9d3be439a2e62de",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$updateImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateImage"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f2e$next$2d$internal$2f$server$2f$app$2f$admin$2f$images$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$createImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE1__$3d3e$__$225b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$updateImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29222c$__ACTIONS_MODULE2__$3d3e$__$225b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$deleteImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/Downloads/admin-app/.next-internal/server/app/admin/images/page/actions.js { ACTIONS_MODULE0 => "[project]/Downloads/admin-app/app/actions/createImage.ts [app-rsc] (ecmascript)", ACTIONS_MODULE1 => "[project]/Downloads/admin-app/app/actions/updateImage.ts [app-rsc] (ecmascript)", ACTIONS_MODULE2 => "[project]/Downloads/admin-app/app/actions/deleteImage.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$createImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/app/actions/createImage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$updateImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/app/actions/updateImage.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$admin$2d$app$2f$app$2f$actions$2f$deleteImage$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/admin-app/app/actions/deleteImage.ts [app-rsc] (ecmascript)");
}),
"[project]/Downloads/admin-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/Downloads/admin-app/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/Downloads/admin-app/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=Downloads_admin-app_5cd11509._.js.map
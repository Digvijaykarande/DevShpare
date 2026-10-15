import { motion } from "framer-motion";
import { Link2 } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { SectionHeader } from "./SettingsSection";
import { saveSettings, useSettings } from "../../../lib/userStore";
import { CONNECTIONS } from "../../../pages/settings/data/settingsData";

export default function ConnectedAccountsSettings({ notify }) {
  const [settings] = useSettings();

  const setConnected = async (item, value) => {
    // NOTE: real OAuth (GitHub/Google/...) needs provider keys; for now this stores the linked state on the server.
    const ok = await saveSettings({ connections: { ...settings.connections, [item.id]: value } });
    ok ? notify(value ? `${item.name} connected` : `${item.name} disconnected`) : notify("Couldn't save. Check your connection.", "error");
  };

  return (
    <div className="flex flex-col gap-6">
      <SectionHeader icon={Link2} title="Connected Accounts" description="Link other accounts to sign in faster and show more on your profile." />

      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {CONNECTIONS.map((item, i) => {
          const connected = !!settings.connections[item.id];
          return (
            <motion.li key={item.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }} whileHover={{ y: -3 }} className={`flex flex-col gap-4 rounded-2xl border p-4 transition-shadow hover:shadow-md ${connected ? "border-success/30 bg-success-container/30" : "border-outline-variant/60"}`}>
              <div className="flex items-start gap-3">
              <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface-container font-code text-sm font-semibold text-on-surface">{item.initial}</span>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-medium text-on-surface">
                  {item.name}
                  {connected && <Badge variant="success">Connected</Badge>}
                </p>
                <p className="text-xs text-on-surface-variant">{item.hint}</p>
              </div>
              </div>
              {connected
                ? <Button type="button" variant="surface" size="sm" className="self-start" onClick={() => setConnected(item, false)} aria-label={`Disconnect ${item.name}`}>Disconnect</Button>
                : <Button type="button" variant="primary" size="sm" className="self-start" onClick={() => setConnected(item, true)} aria-label={`Connect ${item.name}`}>Connect</Button>}
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
